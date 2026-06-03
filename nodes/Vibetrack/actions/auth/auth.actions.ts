import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

export async function validate(this: IExecuteFunctions): Promise<IDataObject> {
  return (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/auth',
  })) as IDataObject;
}
