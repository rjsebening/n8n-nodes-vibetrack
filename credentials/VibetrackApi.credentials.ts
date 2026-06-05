import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  Icon,
  INodeProperties,
} from 'n8n-workflow';

export class VibetrackApi implements ICredentialType {
  name = 'vibetrackApi';
  displayName = 'VibeTrack API';
  documentationUrl = 'https://github.com/rjsebening/n8n-nodes-vibetrack#readme';
  icon: Icon = 'file:vibetrack.svg';
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-API-Key': '={{$credentials.apiKey}}',
      },
    },
  };

  properties: INodeProperties[] = [
    {
      displayName: 'API Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.vibetrack.com',
      placeholder: 'https://api.vibetrack.com',
      description: 'Base URL of the Vibetrack API',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      description: 'Vibetrack API Key',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v1/auth',
      method: 'GET',
    },
  };
}
