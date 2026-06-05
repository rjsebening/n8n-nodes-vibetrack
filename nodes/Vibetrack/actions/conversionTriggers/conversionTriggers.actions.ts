import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField } from '../utils';

export async function getManyOnline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/conversion-triggers',
    qs: { projectId },
  })) as IDataObject;
  return (response.conversionTriggers as IDataObject[]) || [];
}

export async function getManyOffline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const qs: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
  };
  addOptionalField(qs, 'source', this.getNodeParameter('source', i, '') as string);

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/offline-triggers',
    qs,
  })) as IDataObject;
  return (response.offlineTriggers as IDataObject[]) || [];
}
