import { INodeProperties } from 'n8n-workflow';

export const webhooksOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['webhooks'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a project webhook endpoint',
        action: 'Create a project webhook',
      },
      {
        name: 'Deactivate',
        value: 'deactivate',
        description: 'Deactivate a project webhook endpoint',
        action: 'Deactivate a project webhook',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many project webhooks',
        action: 'Get many project webhooks',
      },
    ],
    default: 'getAll',
  },
];

export const webhooksFields: INodeProperties[] = [
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
        resource: ['webhooks'],
        operation: ['create', 'deactivate', 'getAll'],
      },
    },
    description:
      'Project to manage webhooks for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Webhook Name or ID',
    name: 'id',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getWebhooks',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['deactivate'],
      },
    },
    description:
      'Webhook endpoint to deactivate. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'https://example.com/webhook',
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['create'],
      },
    },
    description: 'Destination URL for conversion.created webhook events',
  },
];
