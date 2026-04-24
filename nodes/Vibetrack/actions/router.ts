import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import * as project from './project/project.actions';
import * as conversionEvent from './conversionEvent/conversionEvent.actions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const resource = this.getNodeParameter('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0) as string;

	for (let i = 0; i < items.length; i++) {
		try {
			let responseData: IDataObject | IDataObject[] = [];

			if (resource === 'project') {
				if (operation === 'getAll') responseData = await project.getAll.call(this);
			} else if (resource === 'conversionEvent') {
				if (operation === 'getAll') responseData = await conversionEvent.getAll.call(this, i);
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
