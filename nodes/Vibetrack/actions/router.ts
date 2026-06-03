import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import * as auth from './auth/auth.actions';
import * as attribution from './attribution/attribution.actions';
import * as conversions from './conversions/conversions.actions';
import * as conversionTriggers from './conversionTriggers/conversionTriggers.actions';
import * as project from './project/project.actions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];
  const resource = this.getNodeParameter('resource', 0) as string;
  const operation = this.getNodeParameter('operation', 0) as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let responseData: IDataObject | IDataObject[] = [];

      if (resource === 'auth') {
        if (operation === 'validate') responseData = await auth.validate.call(this);
      } else if (resource === 'attribution') {
        if (operation === 'aggregate') responseData = await attribution.aggregate.call(this, i);
      } else if (resource === 'conversionTriggers') {
        if (operation === 'getManyOffline') responseData = await conversionTriggers.getManyOffline.call(this, i);
        if (operation === 'getManyOnline') responseData = await conversionTriggers.getManyOnline.call(this, i);
      } else if (resource === 'conversions') {
        if (operation === 'createOffline') responseData = await conversions.createOffline.call(this, i);
        if (operation === 'getManyOnline') responseData = await conversions.getManyOnline.call(this, i);
      } else if (resource === 'project') {
        if (operation === 'getAll') responseData = await project.getAll.call(this);
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
      throw error;
    }
  }

  return [returnData];
}
