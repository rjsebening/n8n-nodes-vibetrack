import { ApplicationError, IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';

type CustomApiCallMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export async function handleApiCall(this: IExecuteFunctions, i: number, operation: string): Promise<unknown> {
  switch (operation) {
    case 'getAuthenticationData': {
      return await vibetrackApiRequest.call(this, {
        method: 'GET',
        path: '/api/v1/auth',
      });
    }

    case 'makeRequest': {
      const method = this.getNodeParameter('httpMethod', i) as string;
      const endpoint = this.getNodeParameter('endpoint', i) as string;
      if (!method || !endpoint) {
        throw new ApplicationError('HTTP method and endpoint are required.');
      }

      const queryParams = (this.getNodeParameter('queryParameters', i) as IDataObject)?.parameter as
        | IDataObject[]
        | undefined;

      const qs: IDataObject = {};
      for (const param of queryParams ?? []) {
        if (param.name && param.value !== undefined) {
          qs[param.name as string] = param.value;
        }
      }

      let body: IDataObject | undefined;
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        const rawBody = this.getNodeParameter('requestBody', i, {});
        body = typeof rawBody === 'string' ? JSON.parse(rawBody) : (rawBody as IDataObject);
      }

      return await vibetrackApiRequest.call(this, {
        method: method as CustomApiCallMethod,
        path: endpoint,
        qs,
        body,
      });
    }

    default:
      throw new ApplicationError(`Unsupported operation: ${operation}`);
  }
}
