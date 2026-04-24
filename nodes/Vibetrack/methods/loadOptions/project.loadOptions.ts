import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { vibetrackApiRequest } from '../transport/httpClient';

interface AuthenticateResponse {
	projects: Array<{
		id: string;
		name: string;
	}>;
}

export async function getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const response = (await vibetrackApiRequest.call(
		this,
		'/api/api-keys/authenticate',
	)) as unknown as AuthenticateResponse;

	return (response.projects || []).map((p) => ({
		name: p.name,
		value: p.id,
	}));
}
