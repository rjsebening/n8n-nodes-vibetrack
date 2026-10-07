import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField } from '../utils';

export async function getManyOnline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const qs: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
  };
  if (this.getNodeParameter('includeInactive', i, false) as boolean) qs.includeInactive = true;

  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/conversion-triggers',
    qs,
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

function buildMatch(match: IDataObject): IDataObject {
  const result: IDataObject = {
    type: match.type,
    operator: match.operator,
    value: match.value,
  };
  addOptionalField(result, 'domainId', match.domainId as string);
  return result;
}

export async function create(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const type = this.getNodeParameter('triggerType', i) as string;
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    name: this.getNodeParameter('name', i) as string,
    type,
  };

  if (type === 'ONLINE') {
    body.match = buildMatch({
      type: this.getNodeParameter('matchType', i) as string,
      operator: this.getNodeParameter('matchOperator', i) as string,
      value: this.getNodeParameter('matchValue', i) as string,
      domainId: this.getNodeParameter('domainId', i, '') as string,
    });
    body.contributesToRoas = this.getNodeParameter('contributesToRoas', i, false) as boolean;
  } else {
    body.offlineSources = {
      api: this.getNodeParameter('offlineSourceApi', i, true) as boolean,
      zapier: this.getNodeParameter('offlineSourceZapier', i, false) as boolean,
    };
  }

  const response = (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/conversion-triggers',
    body,
  })) as IDataObject;
  return (response.conversionTrigger as IDataObject) || response;
}

export async function get(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: `/api/v1/conversion-triggers/${encodeURIComponent(id)}`,
    qs: { projectId },
  })) as IDataObject;
  return (response.conversionTrigger as IDataObject) || response;
}

export async function update(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
  const body: IDataObject = {};

  addOptionalField(body, 'name', updateFields.name as string);
  addOptionalField(body, 'active', updateFields.active as boolean);
  addOptionalField(body, 'contributesToRoas', updateFields.contributesToRoas as boolean);

  const matchRule = (updateFields.match as IDataObject | undefined)?.rule as IDataObject | undefined;
  if (matchRule) body.match = buildMatch(matchRule);

  const offlineSources: IDataObject = {};
  addOptionalField(offlineSources, 'api', updateFields.offlineSourceApi as boolean);
  addOptionalField(offlineSources, 'zapier', updateFields.offlineSourceZapier as boolean);
  if (Object.keys(offlineSources).length > 0) body.offlineSources = offlineSources;

  if (Object.keys(body).length === 0) {
    throw new NodeOperationError(this.getNode(), 'Please set at least one field to update', { itemIndex: i });
  }

  body.projectId = this.getNodeParameter('projectId', i) as string;

  const response = (await vibetrackApiRequest.call(this, {
    method: 'PUT',
    path: `/api/v1/conversion-triggers/${encodeURIComponent(id)}`,
    body,
  })) as IDataObject;
  return (response.conversionTrigger as IDataObject) || response;
}
