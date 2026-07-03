import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField, collectNonEmpty, parseJsonParameter } from '../utils';

const METADATA_GROUPS = ['contact', 'address', 'conversion', 'clickIds'] as const;

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

  const parsedMetadata = parseJsonParameter(this, this.getNodeParameter('metadata', i, '') as string, i, 'Metadata JSON');
  const metadata: IDataObject = parsedMetadata && !Array.isArray(parsedMetadata) ? { ...parsedMetadata } : {};

  const metadataFields = this.getNodeParameter('metadataFields', i, {}) as IDataObject;
  for (const groupName of METADATA_GROUPS) {
    const group = collectNonEmpty(metadataFields[groupName] as IDataObject | undefined);
    if (!group) continue;
    Object.assign(metadata, group);
  }

  if (Object.keys(metadata).length > 0) {
    body.metadata = metadata;
  }

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/offline-conversions',
    body,
  })) as IDataObject;
}
