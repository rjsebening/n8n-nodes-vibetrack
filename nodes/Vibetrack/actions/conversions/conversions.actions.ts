import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField } from '../utils';

export async function getManyOnline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const qs: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    from: this.getNodeParameter('from', i) as string,
    to: this.getNodeParameter('to', i) as string,
  };

  addOptionalField(qs, 'triggerId', this.getNodeParameter('triggerId', i, '') as string);
  addOptionalField(qs, 'email', this.getNodeParameter('email', i, '') as string);
  addOptionalField(qs, 'limit', this.getNodeParameter('limit', i, 50) as number);
  addOptionalField(qs, 'offset', this.getNodeParameter('offset', i, 0) as number);

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/conversions',
    qs,
  })) as IDataObject;
  return (response.conversions as IDataObject[]) || [];
}

export async function createOffline(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    triggerId: this.getNodeParameter('triggerId', i) as string,
    email: this.getNodeParameter('email', i) as string,
  };

  addOptionalField(body, 'phone', this.getNodeParameter('phone', i, '') as string);
  addOptionalField(body, 'eventTime', this.getNodeParameter('eventTime', i, '') as string);
  addOptionalField(body, 'value', this.getNodeParameter('value', i, '') as string | number);
  addOptionalField(body, 'currency', this.getNodeParameter('currency', i, '') as string);
  addOptionalField(body, 'externalId', this.getNodeParameter('externalId', i, '') as string);

  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
  for (const [key, value] of Object.entries(additionalFields)) {
    addOptionalField(body, key, value as string | number);
  }

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/offline-conversions',
    body,
  })) as IDataObject;
}
