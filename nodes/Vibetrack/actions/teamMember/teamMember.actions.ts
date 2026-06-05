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
