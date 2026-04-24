import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

export async function getAll(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
	const projectId = this.getNodeParameter('projectId', i) as string;
	const response = (await vibetrackApiRequest.call(
		this,
		'/api/api-keys/triggers',
		{ projectId },
	)) as IDataObject;
	return (response.triggers as IDataObject[]) || [];
}
