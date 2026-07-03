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
    displayName: 'Metadata Fields',
    name: 'metadataFields',
    type: 'fixedCollection',
    placeholder: 'Add Metadata Group',
    typeOptions: {
      multipleValues: false,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Structured metadata fields for the offline conversion',
    options: [
      {
        name: 'contact',
        displayName: 'Contact',
        values: [
          {
            displayName: 'Alternative Emails',
            name: 'alternativeEmails',
            type: 'string',
            default: '',
            description: 'Additional email addresses for the contact',
          },
          {
            displayName: 'First Name',
            name: 'firstName',
            type: 'string',
            default: '',
            description: 'Contact first name',
          },
          {
            displayName: 'Last Name',
            name: 'lastName',
            type: 'string',
            default: '',
            description: 'Contact last name',
          },
          {
            displayName: 'Full Name',
            name: 'fullName',
            type: 'string',
            default: '',
            description: 'Contact full name',
          },
        ],
      },
      {
        name: 'address',
        displayName: 'Address',
        values: [
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
            description: 'Street address',
          },
          {
            displayName: 'ZIP',
            name: 'zip',
            type: 'string',
            default: '',
            description: 'Postal or ZIP code',
          },
          {
            displayName: 'City',
            name: 'city',
            type: 'string',
            default: '',
            description: 'City name',
          },
          {
            displayName: 'State',
            name: 'state',
            type: 'string',
            default: '',
            description: 'State or region',
          },
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: '',
            description: 'Country name or code',
          },
        ],
      },
      {
        name: 'conversion',
        displayName: 'Conversion',
        values: [
          {
            displayName: 'Value With Currency',
            name: 'valueWithCurrency',
            type: 'string',
            default: '',
            description: 'Conversion value including the currency',
          },
          {
            displayName: 'First Rate',
            name: 'firstRate',
            type: 'string',
            default: '',
            description: 'First rate or installment amount',
          },
          {
            displayName: 'Term Months',
            name: 'termMonths',
            type: 'string',
            default: '',
            description: 'Contract term in months',
          },
          {
            displayName: 'Packet',
            name: 'packet',
            type: 'string',
            default: '',
            description: 'Selected packet or plan',
          },
        ],
      },
      {
        name: 'clickIds',
        displayName: 'Click IDs',
        values: [
          {
            displayName: 'Fbc',
            name: 'fbc',
            type: 'string',
            default: '',
            description: 'Facebook click identifier (fbc)',
          },
          {
            displayName: 'Fbp',
            name: 'fbp',
            type: 'string',
            default: '',
            description: 'Facebook browser identifier (fbp)',
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
            displayName: 'Wbraid',
            name: 'wbraid',
            type: 'string',
            default: '',
            description: 'Google wbraid click identifier',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Metadata JSON',
    name: 'metadata',
    type: 'json',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['createOffline'],
      },
    },
    description: 'Additional metadata as JSON object. Metadata Fields override matching keys here.',
  },
];
