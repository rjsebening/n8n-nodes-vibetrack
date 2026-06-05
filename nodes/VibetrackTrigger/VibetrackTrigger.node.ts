import {
  IDataObject,
  IHookFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import { vibetrackApiRequest } from '../Vibetrack/methods/transport/httpClient';
import * as loadOptions from '../Vibetrack/methods/loadOptions';
import { triggerProperties } from './trigger.properties';

type TriggerStaticData = {
  webhookId?: string;
  webhookSecret?: string;
  webhookUrl?: string;
};

interface WebhookCreateResponse {
  webhook?: {
    id?: string;
  };
  secret?: string;
}

interface WebhookListResponse {
  webhooks?: Array<{
    id?: string;
    url?: string;
    active?: boolean;
  }>;
}

async function getExistingWebhookId(
  hookFunctions: IHookFunctions,
  projectId: string,
  webhookUrl: string,
): Promise<string | undefined> {
  const response = (await vibetrackApiRequest.call(hookFunctions, {
    method: 'GET',
    path: '/api/v1/webhooks',
    qs: { projectId },
  })) as WebhookListResponse;

  return (response.webhooks || []).find((webhook) => webhook.active !== false && webhook.url === webhookUrl)?.id;
}

export class VibetrackTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'VibeTrack Trigger',
    name: 'vibetrackTrigger',
    icon: 'file:../Vibetrack/vibetrack.svg',
    group: ['trigger'],
    version: 1,
    description: 'Interact with VibeTrack.com (powered by joergsebening.de)',
    defaults: {
      name: 'VibeTrack Trigger',
      // @ts-expect-error -- description required by linter
      description: 'Interact with VibeTrack.com (powered by joergsebening.de)',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'vibetrackApi',
        required: true,
        // @ts-expect-error -- description required by linter
        description: 'VibeTrack API',
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        responseData: 'firstEntryJson',
        path: 'webhook',
        active: true,
      },
    ],
    properties: triggerProperties,
    usableAsTool: true,
  };

  methods = {
    loadOptions,
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const projectId = this.getNodeParameter('projectId') as string;
        const webhookUrl = this.getNodeWebhookUrl('default');
        if (!webhookUrl) return false;

        const webhookData = this.getWorkflowStaticData('node') as TriggerStaticData;
        if (webhookData.webhookId && webhookData.webhookUrl === webhookUrl) return true;

        const existingWebhookId = await getExistingWebhookId(this, projectId, webhookUrl);
        if (!existingWebhookId) return false;

        webhookData.webhookId = existingWebhookId;
        webhookData.webhookUrl = webhookUrl;
        return true;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const projectId = this.getNodeParameter('projectId') as string;
        const webhookUrl = this.getNodeWebhookUrl('default');
        if (!webhookUrl) return false;

        const response = (await vibetrackApiRequest.call(this, {
          method: 'POST',
          path: '/api/v1/webhooks',
          body: {
            projectId,
            url: webhookUrl,
          },
        })) as WebhookCreateResponse;

        const webhookId = response.webhook?.id;
        if (!webhookId) return false;

        const webhookData = this.getWorkflowStaticData('node') as TriggerStaticData;
        webhookData.webhookId = webhookId;
        webhookData.webhookUrl = webhookUrl;
        if (response.secret) webhookData.webhookSecret = response.secret;

        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const projectId = this.getNodeParameter('projectId') as string;
        const webhookData = this.getWorkflowStaticData('node') as TriggerStaticData;
        const webhookId = webhookData.webhookId;
        if (!webhookId) return true;

        await vibetrackApiRequest.call(this, {
          method: 'DELETE',
          path: `/api/v1/webhooks/${encodeURIComponent(webhookId)}`,
          qs: { projectId },
        });

        delete webhookData.webhookId;
        delete webhookData.webhookSecret;
        delete webhookData.webhookUrl;

        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData() as IDataObject;
    const workflowData: INodeExecutionData[][] = [this.helpers.returnJsonArray(body)];

    return {
      workflowData,
      webhookResponse: { success: true },
    };
  }
}
