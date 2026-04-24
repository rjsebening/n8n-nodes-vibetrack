import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

export async function getAll(this: IExecuteFunctions): Promise<IDataObject[]> {
	const response = (await vibetrackApiRequest.call(
		this,
		'/api/api-keys/authenticate',
	)) as IDataObject;
	return (response.projects as IDataObject[]) || [];
}
