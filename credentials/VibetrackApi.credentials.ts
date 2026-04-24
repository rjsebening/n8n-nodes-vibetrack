import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class VibetrackApi implements ICredentialType {
	name = 'vibetrackApi';
	displayName = 'Vibetrack API';
	documentationUrl = 'https://github.com/rjsebening/n8n-nodes-vibetrack#readme';
	icon: Icon = 'file:vibetrack.svg';
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				apiKey: '={{$credentials.apiKey}}',
			},
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.vibetrack.com',
			placeholder: 'https://app.vibetrack.com',
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
			url: '/api/api-keys/authenticate',
			method: 'POST',
			body: {
				apiKey: '={{$credentials.apiKey}}',
			},
		},
	};
}
