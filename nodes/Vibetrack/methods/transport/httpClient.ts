import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  IHttpRequestOptions,
  NodeApiError,
  JsonObject,
} from 'n8n-workflow';

const DEFAULT_BASE_URL = 'https://api.vibetrack.com';

interface VibetrackApiRequestOptions {
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  path: string;
  qs?: IDataObject;
  body?: IDataObject;
}

function getBaseUrl(baseUrl: string | undefined): string {
  return (baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
}

export async function vibetrackApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  requestOptions: VibetrackApiRequestOptions,
): Promise<unknown> {
  const credentials = await this.getCredentials('vibetrackApi');
  const baseUrl = getBaseUrl(credentials.baseUrl as string | undefined);
  const method = requestOptions.method || 'GET';

  const options: IHttpRequestOptions = {
    method,
    url: `${baseUrl}${requestOptions.path}`,
    json: true,
    headers: {
      'X-API-Key': credentials.apiKey as string,
    },
  };

  if (requestOptions.qs && Object.keys(requestOptions.qs).length > 0) {
    options.qs = requestOptions.qs;
  }

  if (method !== 'GET' && requestOptions.body && Object.keys(requestOptions.body).length > 0) {
    options.body = requestOptions.body;
  }

  try {
    return await this.helpers.httpRequestWithAuthentication.call(this, 'vibetrackApi', options);
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }
}
