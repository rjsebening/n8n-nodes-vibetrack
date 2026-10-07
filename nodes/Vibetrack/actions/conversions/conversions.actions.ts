import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField, parseJsonParameter } from '../utils';

export async function getManyOnline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const qs: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
  };

  addOptionalField(qs, 'from', this.getNodeParameter('from', i, '') as string);
  addOptionalField(qs, 'to', this.getNodeParameter('to', i, '') as string);
  addOptionalField(qs, 'unique', this.getNodeParameter('unique', i, true) as boolean);
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

function parseMetadata(executeFunctions: IExecuteFunctions, value: unknown, i: number): IDataObject | undefined {
  if (value && typeof value === 'object') {
    return Object.keys(value).length > 0 ? (value as IDataObject) : undefined;
  }
  const parsed = parseJsonParameter(executeFunctions, value as string, i, 'Metadata');
  if (parsed !== undefined && (Array.isArray(parsed) || typeof parsed !== 'object' || parsed === null)) {
    throw new NodeOperationError(executeFunctions.getNode(), 'Metadata must be a JSON object', { itemIndex: i });
  }
  return parsed && Object.keys(parsed).length > 0 ? (parsed as IDataObject) : undefined;
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
    if (key === 'metadata') {
      addOptionalField(body, key, parseMetadata(this, value, i));
    } else {
      addOptionalField(body, key, value as string | number);
    }
  }

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/offline-conversions',
    body,
  })) as IDataObject;
}

export async function getManyOffline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const qs: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
  };

  const filters = this.getNodeParameter('offlineFilters', i, {}) as IDataObject;
  for (const [key, value] of Object.entries(filters)) {
    addOptionalField(qs, key, value as string);
  }
  addOptionalField(qs, 'limit', this.getNodeParameter('limit', i, 50) as number);
  addOptionalField(qs, 'offset', this.getNodeParameter('offset', i, 0) as number);

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/offline-conversions',
    qs,
  })) as IDataObject;
  return (response.offlineConversions as IDataObject[]) || [];
}

export async function getOffline(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('conversionId', i) as string;
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: `/api/v1/offline-conversions/${encodeURIComponent(id)}`,
    qs: { projectId },
  })) as IDataObject;
  return (response.offlineConversion as IDataObject) || response;
}
