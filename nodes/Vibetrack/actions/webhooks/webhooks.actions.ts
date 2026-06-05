import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

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
  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/webhooks',
    body: {
      projectId: this.getNodeParameter('projectId', i) as string,
      url: this.getNodeParameter('url', i) as string,
    },
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
