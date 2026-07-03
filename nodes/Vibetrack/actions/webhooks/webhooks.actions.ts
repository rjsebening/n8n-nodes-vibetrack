import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField } from '../utils';

export async function getAll(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/webhooks',
    qs: { projectId },
  })) as IDataObject;
  return (response.webhooks as IDataObject[]) || [];
}

export async function create(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    hookUrl: this.getNodeParameter('url', i) as string,
  };

  addOptionalField(body, 'type', this.getNodeParameter('type', i, 'conversion.created') as string);
  const filter: IDataObject = {};
  addOptionalField(filter, 'triggerId', this.getNodeParameter('triggerId', i, '') as string);
  addOptionalField(filter, 'eventName', this.getNodeParameter('eventName', i, '') as string);
  if (Object.keys(filter).length > 0) body.filter = filter;

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/webhooks',
    body,
  })) as IDataObject;
}

export async function get(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const projectId = this.getNodeParameter('projectId', i) as string;
  return (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: `/api/v1/webhooks/${encodeURIComponent(id)}`,
    qs: { projectId },
  })) as IDataObject;
}

export async function update(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    hookUrl: this.getNodeParameter('url', i) as string,
  };

  addOptionalField(body, 'type', this.getNodeParameter('type', i, 'conversion.created') as string);
  addOptionalField(body, 'active', this.getNodeParameter('active', i, true) as boolean);

  const filter: IDataObject = {};
  addOptionalField(filter, 'triggerId', this.getNodeParameter('triggerId', i, '') as string);
  addOptionalField(filter, 'eventName', this.getNodeParameter('eventName', i, '') as string);
  if (Object.keys(filter).length > 0) body.filter = filter;

  return (await vibetrackApiRequest.call(this, {
    method: 'PUT',
    path: `/api/v1/webhooks/${encodeURIComponent(id)}`,
    body,
  })) as IDataObject;
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'DELETE',
    path: `/api/v1/webhooks/${encodeURIComponent(id)}`,
    qs: { projectId },
  })) as IDataObject | undefined;
  return response || { success: true, id };
}
