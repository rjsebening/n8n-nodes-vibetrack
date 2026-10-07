import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { vibetrackApiRequest } from '../transport/httpClient';

interface ProjectsResponse {
  projects: Array<{
    id: string;
    name: string;
  }>;
}

export async function getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/projects',
  })) as unknown as ProjectsResponse;

  return (response.projects || []).map((p) => ({
    name: p.name,
    value: p.id,
  }));
}

interface TriggerResponse {
  conversionTriggers?: Array<{
    id: string;
    name: string;
    type?: string;
  }>;
  offlineTriggers?: Array<{
    id: string;
    name: string;
  }>;
}

interface WebhookResponse {
  webhooks?: Array<{
    id: string;
    hookUrl?: string;
    url?: string;
    active?: boolean;
  }>;
}

function getCurrentProjectId(loadOptionsFunctions: ILoadOptionsFunctions): string {
  const projectId = loadOptionsFunctions.getCurrentNodeParameter('projectId');
  return typeof projectId === 'string' ? projectId : '';
}

function mapTriggers(triggers: Array<{ id: string; name: string }> = []): INodePropertyOptions[] {
  return triggers.map((trigger) => ({
    name: trigger.name,
    value: trigger.id,
  }));
}

export async function getConversionTriggers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/conversion-triggers',
    qs: { projectId },
  })) as unknown as TriggerResponse;

  return mapTriggers((response.conversionTriggers || []).filter((trigger) => trigger.type !== 'OFFLINE'));
}

export async function getOfflineTriggers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/offline-triggers',
    qs: { projectId },
  })) as unknown as TriggerResponse;

  return mapTriggers(response.offlineTriggers);
}

export async function getWebhooks(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/webhooks',
    qs: { projectId },
  })) as unknown as WebhookResponse;

  return (response.webhooks || []).map((webhook) => {
    const webhookUrl = webhook.hookUrl || webhook.url || webhook.id;

    return {
      name: webhookUrl,
      value: webhook.id,
    };
  });
}

export async function getAllConversionTriggers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/conversion-triggers',
    qs: { projectId, includeInactive: true },
  })) as unknown as TriggerResponse;

  return mapTriggers(response.conversionTriggers);
}

interface DomainResponse {
  domains?: Array<{
    id: string;
    url: string;
  }>;
}

export async function getDomains(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/domains',
    qs: { projectId },
  })) as unknown as DomainResponse;

  return (response.domains || []).map((domain) => ({
    name: domain.url,
    value: domain.id,
  }));
}

interface MagicLinkResponse {
  magicLinks?: Array<{
    id: string;
    name: string;
    url?: string;
  }>;
}

export async function getMagicLinks(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const projectId = getCurrentProjectId(this);
  if (!projectId) return [];

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/magic-links',
    qs: { projectId },
  })) as unknown as MagicLinkResponse;

  return (response.magicLinks || []).map((magicLink) => ({
    name: magicLink.url ? `${magicLink.name} (${magicLink.url})` : magicLink.name,
    value: magicLink.id,
  }));
}
