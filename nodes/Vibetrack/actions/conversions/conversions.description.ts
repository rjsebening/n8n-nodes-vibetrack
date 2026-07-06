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
    required: true,
    placeholder: 'name@email.com',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Contact email for the offline conversion',
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
        operation: ['getManyOnline'],
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
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Additional optional fields to send with the offline conversion',
    options: [
      {
        displayName: 'Alternative Emails',
        name: 'alternativeEmails',
        type: 'string',
        default: '',
        description: 'Additional email addresses for the contact',
      },
      {
        displayName: 'City',
        name: 'city',
        type: 'string',
        default: '',
        description: 'City name',
      },
      {
        displayName: 'Click ID',
        name: 'clickId',
        type: 'string',
        default: '',
        description: 'Generic click identifier',
      },
      {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: '',
        description: 'Country name or code',
      },
      {
        displayName: 'Event Source URL',
        name: 'eventSourceUrl',
        type: 'string',
        default: '',
        placeholder: 'https://example.com/',
        description: 'URL where the conversion event originated',
      },
      {
        displayName: 'Fbc',
        name: 'fbc',
        type: 'string',
        default: '',
        description: 'Facebook click identifier (fbc)',
      },
      {
        displayName: 'Fbclid',
        name: 'fbclid',
        type: 'string',
        default: '',
        description: 'Facebook click ID query parameter (fbclid)',
      },
      {
        displayName: 'Fbp',
        name: 'fbp',
        type: 'string',
        default: '',
        description: 'Facebook browser identifier (fbp)',
      },
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: 'Contact first name',
      },
      {
        displayName: 'First Rate',
        name: 'firstRate',
        type: 'number',
        default: 0,
        description: 'First rate or installment amount',
      },
      {
        displayName: 'Full Name',
        name: 'fullName',
        type: 'string',
        default: '',
        description: 'Contact full name',
      },
      {
        displayName: 'Gbraid',
        name: 'gbraid',
        type: 'string',
        default: '',
        description: 'Google gbraid click identifier',
      },
      {
        displayName: 'Gclid',
        name: 'gclid',
        type: 'string',
        default: '',
        description: 'Google click identifier (gclid)',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'Contact last name',
      },
      {
        displayName: 'Packet',
        name: 'packet',
        type: 'string',
        default: '',
        description: 'Selected packet or plan',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'string',
        default: '',
        description: 'State or region',
      },
      {
        displayName: 'Street',
        name: 'street',
        type: 'string',
        default: '',
        description: 'Street address',
      },
      {
        displayName: 'Term Months',
        name: 'termMonths',
        type: 'number',
        default: 0,
        description: 'Contract term in months',
      },
      {
        displayName: 'Timestamp',
        name: 'timestamp',
        type: 'string',
        default: '',
        description: 'Raw timestamp for the conversion event',
      },
      {
        displayName: 'Value With Currency',
        name: 'valueWithCurrency',
        type: 'string',
        default: '',
        description: 'Conversion value including the currency',
      },
      {
        displayName: 'Wbraid',
        name: 'wbraid',
        type: 'string',
        default: '',
        description: 'Google wbraid click identifier',
      },
      {
        displayName: 'Website ID',
        name: 'websiteId',
        type: 'string',
        default: '',
        description: 'Identifier of the website the conversion belongs to',
      },
      {
        displayName: 'ZIP',
        name: 'zip',
        type: 'string',
        default: '',
        description: 'Postal or ZIP code',
      },
    ],
  },
];
