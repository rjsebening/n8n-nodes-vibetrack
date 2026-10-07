import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

export async function getAll(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
  const projectId = this.getNodeParameter('projectId', i) as string;
  const response = (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/domains',
    qs: { projectId },
  })) as IDataObject;
  return (response.domains as IDataObject[]) || [];
}

export async function create(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    url: this.getNodeParameter('url', i) as string,
  };

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/domains',
    body,
  })) as IDataObject;
}

export async function checkTracking(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const id = this.getNodeParameter('id', i) as string;
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
  };

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: `/api/v1/domains/${encodeURIComponent(id)}/tracking-check`,
    body,
  })) as IDataObject;
}
