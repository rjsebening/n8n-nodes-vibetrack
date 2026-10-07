import {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  JsonObject,
  NodeApiError,
  NodeOperationError,
} from 'n8n-workflow';
import { handleApiCall } from './apiCall/apiCall.actions';
import * as attribution from './attribution/attribution.actions';
import * as conversions from './conversions/conversions.actions';
import * as conversionTriggers from './conversionTriggers/conversionTriggers.actions';
import * as domain from './domain/domain.actions';
import * as magicLink from './magicLink/magicLink.actions';
import * as project from './project/project.actions';
import * as teamMember from './teamMember/teamMember.actions';
import * as webhooks from './webhooks/webhooks.actions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];
  const resource = this.getNodeParameter('resource', 0) as string;
  const operation = this.getNodeParameter('operation', 0) as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let responseData: IDataObject | IDataObject[] = [];

      if (resource === 'apiCall') {
        responseData = (await handleApiCall.call(this, i, operation)) as IDataObject | IDataObject[];
      } else if (resource === 'attribution') {
        if (operation === 'aggregate') responseData = await attribution.aggregate.call(this, i);
      } else if (resource === 'conversionTriggers') {
        if (operation === 'create') responseData = await conversionTriggers.create.call(this, i);
        if (operation === 'get') responseData = await conversionTriggers.get.call(this, i);
        if (operation === 'getManyOffline') responseData = await conversionTriggers.getManyOffline.call(this, i);
        if (operation === 'getManyOnline') responseData = await conversionTriggers.getManyOnline.call(this, i);
        if (operation === 'update') responseData = await conversionTriggers.update.call(this, i);
      } else if (resource === 'conversions') {
        if (operation === 'createOffline') responseData = await conversions.createOffline.call(this, i);
        if (operation === 'getManyOffline') responseData = await conversions.getManyOffline.call(this, i);
        if (operation === 'getManyOnline') responseData = await conversions.getManyOnline.call(this, i);
        if (operation === 'getOffline') responseData = await conversions.getOffline.call(this, i);
      } else if (resource === 'domain') {
        if (operation === 'checkTracking') responseData = await domain.checkTracking.call(this, i);
        if (operation === 'create') responseData = await domain.create.call(this, i);
        if (operation === 'getAll') responseData = await domain.getAll.call(this, i);
      } else if (resource === 'magicLink') {
        if (operation === 'create') responseData = await magicLink.create.call(this, i);
        if (operation === 'get') responseData = await magicLink.get.call(this, i);
        if (operation === 'getAll') responseData = await magicLink.getAll.call(this, i);
        if (operation === 'update') responseData = await magicLink.update.call(this, i);
      } else if (resource === 'project') {
        if (operation === 'getAll') responseData = await project.getAll.call(this);
      } else if (resource === 'teamMember') {
        if (operation === 'addOrInvite') responseData = await teamMember.addOrInvite.call(this, i);
        if (operation === 'getAll') responseData = await teamMember.getAll.call(this, i);
        if (operation === 'remove') responseData = await teamMember.remove.call(this, i);
      } else if (resource === 'webhooks') {
        if (operation === 'create') responseData = await webhooks.create.call(this, i);
        if (operation === 'deactivate') responseData = await webhooks.deactivate.call(this, i);
        if (operation === 'get') responseData = await webhooks.get.call(this, i);
        if (operation === 'getAll') responseData = await webhooks.getAll.call(this, i);
        if (operation === 'update') responseData = await webhooks.update.call(this, i);
      }

      const executionData = this.helpers.returnJsonArray(responseData);
      executionData.forEach((executionDataItem) => {
        executionDataItem.pairedItem = { item: i };
      });
      returnData.push(...executionData);
    } catch (error) {
      if (this.continueOnFail()) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        returnData.push({ json: { error: errorMessage } });
        continue;
      }
      throw error instanceof NodeApiError || error instanceof NodeOperationError
        ? error
        : new NodeApiError(this.getNode(), error as JsonObject);
    }
  }

  return [returnData];
}
