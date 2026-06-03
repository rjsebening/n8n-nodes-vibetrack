import { INodeProperties } from 'n8n-workflow';
import * as auth from './auth/auth.description';
import * as attribution from './attribution/attribution.description';
import * as conversions from './conversions/conversions.description';
import * as conversionTriggers from './conversionTriggers/conversionTriggers.description';
import * as project from './project/project.description';

export { router } from './router';

export const actions: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
      { name: 'Attribution', value: 'attribution' },
      { name: 'Auth', value: 'auth' },
      // eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
      { name: 'Conversion Triggers', value: 'conversionTriggers' },
      { name: 'Conversions', value: 'conversions' },
      { name: 'Project', value: 'project' },
    ],
    default: 'project',
  },
  ...auth.authOperations,
  ...auth.authFields,
  ...attribution.attributionOperations,
  ...attribution.attributionFields,
  ...conversionTriggers.conversionTriggersOperations,
  ...conversionTriggers.conversionTriggersFields,
  ...conversions.conversionsOperations,
  ...conversions.conversionsFields,
  ...project.projectOperations,
  ...project.projectFields,
];
