import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField, parseJsonParameter } from '../utils';

export async function getManyOnline(this: IExecuteFunctions, i: number): Promise<IDataObject[]> {
	const qs: IDataObject = {
		projectId: this.getNodeParameter('projectId', i) as string,
		from: this.getNodeParameter('from', i) as string,
		to: this.getNodeParameter('to', i) as string,
	};

	addOptionalField(qs, 'triggerId', this.getNodeParameter('triggerId', i, '') as string);
	addOptionalField(qs, 'email', this.getNodeParameter('email', i, '') as string);
	addOptionalField(qs, 'limit', this.getNodeParameter('limit', i, 50) as number);
	addOptionalField(qs, 'offset', this.getNodeParameter('offset', i, 0) as number);

	const response = (await vibetrackApiRequest.call(this, {
		method: 'GET',
		path: '/conversions',
		qs,
	})) as IDataObject;
	return (response.conversions as IDataObject[]) || [];
}

export async function createOffline(this: IExecuteFunctions, i: number): Promise<IDataObject> {
	const body: IDataObject = {
		projectId: this.getNodeParameter('projectId', i) as string,
		triggerId: this.getNodeParameter('triggerId', i) as string,
	};

	addOptionalField(body, 'email', this.getNodeParameter('email', i, '') as string);
	addOptionalField(body, 'phone', this.getNodeParameter('phone', i, '') as string);
	addOptionalField(body, 'eventTime', this.getNodeParameter('eventTime', i, '') as string);
	addOptionalField(body, 'value', this.getNodeParameter('value', i, '') as string | number);
	addOptionalField(body, 'currency', this.getNodeParameter('currency', i, '') as string);
	addOptionalField(body, 'externalId', this.getNodeParameter('externalId', i, '') as string);

	const metadata = parseJsonParameter(
		this,
		this.getNodeParameter('metadata', i, '') as string,
		i,
		'Metadata',
	);
	if (metadata) body.metadata = metadata as IDataObject;

	return (await vibetrackApiRequest.call(this, {
		method: 'POST',
		path: '/offline-conversions',
		body,
	})) as IDataObject;
}
