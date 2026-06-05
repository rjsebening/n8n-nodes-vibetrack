import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { vibetrackApiRequest } from '../../methods/transport/httpClient';
import { addOptionalField, parseJsonParameter, parseStringList } from '../utils';

export async function aggregate(this: IExecuteFunctions, i: number): Promise<IDataObject> {
  const ids = parseStringList(this.getNodeParameter('ids', i) as string);
  const body: IDataObject = {
    projectId: this.getNodeParameter('projectId', i) as string,
    level: this.getNodeParameter('level', i) as string,
    ids,
  };

  addOptionalField(body, 'from', this.getNodeParameter('from', i, '') as string);
  addOptionalField(body, 'to', this.getNodeParameter('to', i, '') as string);

  const selectedConversionTriggers = parseJsonParameter(
    this,
    this.getNodeParameter('selectedConversionTriggers', i, '') as string,
    i,
    'Selected Conversion Triggers',
  );
  if (selectedConversionTriggers) body.selectedConversionTriggers = selectedConversionTriggers;

  const idParameterMapping = parseJsonParameter(
    this,
    this.getNodeParameter('idParameterMapping', i, '') as string,
    i,
    'ID Parameter Mapping',
  );
  if (idParameterMapping) body.idParameterMapping = idParameterMapping as IDataObject;

  return (await vibetrackApiRequest.call(this, {
    method: 'POST',
    path: '/api/v1/attribution/aggregate',
    body,
  })) as IDataObject;
}
