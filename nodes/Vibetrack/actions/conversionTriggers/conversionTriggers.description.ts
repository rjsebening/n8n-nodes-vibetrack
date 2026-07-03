import { INodeProperties } from 'n8n-workflow';

export const conversionTriggersOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
      },
    },
    options: [
      {
        name: 'Get Many Offline',
        value: 'getManyOffline',
        description: 'Retrieve active offline conversion triggers for a project',
        action: 'Get many offline conversion triggers',
      },
      {
        name: 'Get Many Online',
        value: 'getManyOnline',
        description: 'Retrieve active online conversion triggers for a project',
        action: 'Get many online conversion triggers',
      },
    ],
    default: 'getManyOnline',
  },
];

export const conversionTriggersFields: INodeProperties[] = [
  {
    displayName: 'Project Name or ID',
    name: 'projectId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getProjects',
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['getManyOffline', 'getManyOnline'],
      },
    },
    description:
      'Project to list conversion triggers for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Source',
    name: 'source',
    type: 'options',
    options: [
      {
        name: 'Any',
        value: '',
      },
      {
        name: 'API',
        value: 'api',
      },
      {
        name: 'Zapier',
        value: 'zapier',
      },
    ],
    default: '',
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['getManyOffline'],
      },
    },
    description: 'Optional source filter',
  },
];
