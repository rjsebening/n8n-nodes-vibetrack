import { INodeProperties } from 'n8n-workflow';

export const conversionsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
      },
    },
    options: [
      {
        name: 'Create Offline',
        value: 'createOffline',
        description: 'Create and process an offline conversion',
        action: 'Create an offline conversion',
      },
      {
        name: 'Get Many Online',
        value: 'getManyOnline',
        description: 'Retrieve many online conversions for a project',
        action: 'Get many online conversions',
      },
    ],
    default: 'getManyOnline',
  },
];

export const conversionsFields: INodeProperties[] = [
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
        resource: ['conversions'],
        operation: ['createOffline', 'getManyOnline'],
      },
    },
    description:
      'Project to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Trigger Name or ID',
    name: 'triggerId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getConversionTriggers',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description:
      'Online conversion trigger to filter by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Trigger Name or ID',
    name: 'triggerId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getOfflineTriggers',
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description:
      'Offline trigger to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'From',
    name: 'from',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'Start of the date range',
  },
  {
    displayName: 'To',
    name: 'to',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'End of the date range',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    placeholder: 'name@email.com',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline', 'getManyOnline'],
      },
    },
    description: 'Contact or conversion email',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 50,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Offset',
    name: 'offset',
    type: 'number',
    typeOptions: {
      minValue: 0,
    },
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'Number of conversions to skip',
  },
  {
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Contact phone number for the offline conversion',
  },
  {
    displayName: 'Event Time',
    name: 'eventTime',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'When the offline conversion happened',
  },
  {
    displayName: 'Value',
    name: 'value',
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Conversion value',
  },
  {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    default: '',
    placeholder: 'EUR',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Currency code for the conversion value',
  },
  {
    displayName: 'External ID',
    name: 'externalId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'External idempotency or reference ID',
  },
  {
    displayName: 'Metadata',
    name: 'metadata',
    type: 'json',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Additional metadata as JSON object',
  },
];
