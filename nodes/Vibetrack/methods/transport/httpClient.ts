import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestOptions,
	NodeApiError,
	JsonObject,
} from 'n8n-workflow';

const DEFAULT_BASE_URL = 'https://app.vibetrack.com';

export async function vibetrackApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	path: string,
	body: IDataObject = {},
): Promise<unknown> {
	const credentials = await this.getCredentials('vibetrackApi');
	const baseUrl = (credentials.baseUrl as string) || DEFAULT_BASE_URL;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}${path}`,
		body,
		json: true,
	};

	try {
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'vibetrackApi',
			options,
		);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
