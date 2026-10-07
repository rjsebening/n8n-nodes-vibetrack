import { IExecuteFunctions, IDataObject, NodeOperationError } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField } from '../utils';

export async function getAll(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/magic-links',
    qs: { projectId },
  })) as IDataObject;
  return (response.magicLinks as IDataObject[]) || [];
}

export async function get(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: `/api/v1/magic-links/${encodeURIComponent(id)}`,
    qs: { projectId },
  })) as IDataObject;
  return (response.magicLink as IDataObject) || response;
}

export async function create(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    name: this.getNodeParameter('name', i) as string,
    targetUrl: this.getNodeParameter('targetUrl', i) as string,
    domain: this.getNodeParameter('domain', i) as string,
    backHalf: this.getNodeParameter('backHalf', i) as string,
  };

  addOptionalField(
    body,
    'conversionTrackingEnabled',
    this.getNodeParameter('conversionTrackingEnabled', i, false) as boolean,
  );

  const response = (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/magic-links',
    body,
  })) as IDataObject;
  return (response.magicLink as IDataObject) || response;
}

export async function update(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
  const body: IDataObject = {};

  for (const [key, value] of Object.entries(updateFields)) {
    addOptionalField(body, key, value as string | boolean);
  }

  if (Object.keys(body).length === 0) {
    throw new NodeOperationError(this.getNode(), 'Please set at least one field to update', { itemIndex: i });
  }

  body.projectId = this.getNodeParameter('projectId', i) as string;

  const response = (await vibetrackApiRequest.call(this, {
    method: 'PUT',
    path: `/api/v1/magic-links/${encodeURIComponent(id)}`,
    body,
  })) as IDataObject;
  return (response.magicLink as IDataObject) || response;
}
