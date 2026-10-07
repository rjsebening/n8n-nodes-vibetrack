import { INodeProperties } from 'n8n-workflow';
import * as apiCall from './apiCall';
import * as attribution from './attribution/attribution.description';
import * as conversions from './conversions/conversions.description';
import * as conversionTriggers from './conversionTriggers/conversionTriggers.description';
import * as domain from './domain/domain.description';
import * as magicLink from './magicLink/magicLink.description';
import * as project from './project/project.description';
import * as teamMember from './teamMember/teamMember.description';
import * as webhooks from './webhooks/webhooks.description';

export { router } from './router';

export const actions: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
      { name: 'API Call', value: 'apiCall', description: 'Make a custom API call to the VibeTrack API' },
      { name: 'Attribution', value: 'attribution' },
      { name: 'Conversion', value: 'conversions' },
      { name: 'Conversion Trigger', value: 'conversionTriggers' },
      { name: 'Domain', value: 'domain' },
      { name: 'Magic Link', value: 'magicLink' },
      { name: 'Project', value: 'project' },
      { name: 'Team Member', value: 'teamMember' },
      { name: 'Webhook', value: 'webhooks' },
    ],
    default: 'project',
  },
  ...apiCall.apiCallOperations,
  ...apiCall.apiCallFields,
  ...attribution.attributionOperations,
  ...attribution.attributionFields,
  ...conversionTriggers.conversionTriggersOperations,
  ...conversionTriggers.conversionTriggersFields,
  ...conversions.conversionsOperations,
  ...conversions.conversionsFields,
  ...domain.domainOperations,
  ...domain.domainFields,
  ...magicLink.magicLinkOperations,
  ...magicLink.magicLinkFields,
  ...project.projectOperations,
  ...project.projectFields,
  ...teamMember.teamMemberOperations,
  ...teamMember.teamMemberFields,
  ...webhooks.webhooksOperations,
  ...webhooks.webhooksFields,
];
