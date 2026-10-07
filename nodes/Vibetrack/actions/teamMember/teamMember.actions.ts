import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

export async function addOrInvite(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const scope = this.getNodeParameter('scope', i) as string;
  const body: IDataObject = {
    email: this.getNodeParameter('email', i) as string,
    accessLevel: this.getNodeParameter('accessLevel', i) as string,
  };

  if (scope === 'project') {
    body.projectId = this.getNodeParameter('projectId', i) as string;
  } else {
    body.workspaceId = this.getNodeParameter('workspaceId', i) as string;
  }

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/team-members',
    body,
  })) as IDataObject;
}

function getScopeQuery(executeFunctions: IExecuteFunctions, i: number): IDataObject {
  const scope = executeFunctions.getNodeParameter('scope', i) as string;
  return scope === 'project'
    ? { projectId: executeFunctions.getNodeParameter('projectId', i) as string }
    : { workspaceId: executeFunctions.getNodeParameter('workspaceId', i) as string };
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  return (await vibetrackApiRequest.call(this, {
    method: 'GET',
    path: '/api/v1/team-members',
    qs: getScopeQuery(this, i),
  })) as IDataObject;
}

export async function remove(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const qs = getScopeQuery(this, i);
  const target = this.getNodeParameter('removeTarget', i) as string;

  if (target === 'member') {
    qs.userId = this.getNodeParameter('userId', i) as string;
  } else {
    qs.invitationId = this.getNodeParameter('invitationId', i) as string;
  }

  return (await vibetrackApiRequest.call(this, {
    method: 'DELETE',
    path: '/api/v1/team-members',
    qs,
  })) as IDataObject;
}
