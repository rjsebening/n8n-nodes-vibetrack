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
        description: 'Create a webhook subscription',
        action: 'Create a webhook subscription',
      },
      {
        name: 'Delete',
        value: 'deactivate',
        description: 'Delete a webhook subscription',
        action: 'Delete a webhook subscription',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a webhook subscription',
        action: 'Get a webhook subscription',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many webhook subscriptions',
        action: 'Get many webhook subscriptions',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a webhook subscription',
        action: 'Update a webhook subscription',
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
        operation: ['create', 'deactivate', 'get', 'getAll', 'update'],
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
        operation: ['deactivate', 'get', 'update'],
      },
    },
    description:
      'Webhook subscription to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        operation: ['create', 'update'],
      },
    },
    description:
      'Destination URL for webhook events. Must use HTTPS and resolve to a public address. Redirects are not followed: a 3xx response counts as a failed delivery.',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    options: [
      {
        name: 'Conversion Created',
        value: 'conversion.created',
      },
    ],
    default: 'conversion.created',
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['create', 'update'],
      },
    },
    description: 'Webhook event type',
  },
  {
    displayName: 'Trigger Name or ID',
    name: 'triggerId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getConversionTriggers',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['create', 'update'],
      },
    },
    description:
      'Optional trigger filter. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Event Name',
    name: 'eventName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['create', 'update'],
      },
    },
    description: 'Optional event name filter',
  },
  {
    displayName: 'Active',
    name: 'active',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['webhooks'],
        operation: ['update'],
      },
    },
    description: 'Whether the webhook subscription is active',
  },
];
