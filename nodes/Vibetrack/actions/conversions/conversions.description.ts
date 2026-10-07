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
        name: 'Get Many Offline',
        value: 'getManyOffline',
        description: 'Retrieve many offline conversions for a project, newest first',
        action: 'Get many offline conversions',
      },
      {
        name: 'Get Many Online',
        value: 'getManyOnline',
        description: 'Retrieve many online conversions for a project',
        action: 'Get many online conversions',
      },
      {
        name: 'Get Offline',
        value: 'getOffline',
        description: 'Retrieve one offline conversion with all data',
        action: 'Get an offline conversion',
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
        operation: ['createOffline', 'getManyOffline', 'getManyOnline', 'getOffline'],
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
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'Start of the date range. Leave empty for no lower bound.',
  },
  {
    displayName: 'To',
    name: 'to',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description: 'End of the date range. Must not be before From. Leave empty for no upper bound.',
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
    displayName: 'Unique Only',
    name: 'unique',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOnline'],
      },
    },
    description:
      'Whether to remove repeated conversions for the same visitor, trigger and trigger page within seven days (like the VibeTrack app). Disable to return all conversions.',
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
        operation: ['getManyOffline', 'getManyOnline'],
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
        operation: ['getManyOffline', 'getManyOnline'],
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
    description:
      'Unique source-system reference used for idempotency and duplicate prevention. Repeating an already processed External ID does not update the conversion or send another event.',
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
        description: 'Comma-separated additional email addresses for the contact',
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
        displayName: 'LinkedIn Click ID',
        name: 'liFatId',
        type: 'string',
        default: '',
        description: 'LinkedIn first-party ads tracking identifier (li_fat_id) used for LinkedIn Ads attribution',
      },
      {
        displayName: 'Metadata',
        name: 'metadata',
        type: 'json',
        default: '{}',
        description:
          'Free-form custom data as a JSON object. Stored with the conversion but not used for matching or ad-platform delivery.',
      },
      {
        displayName: 'OpenAI Browser Reference',
        name: 'obref',
        type: 'string',
        default: '',
        description: 'OpenAI browser reference (obref) used for hybrid Pixel and Conversions API matching',
      },
      {
        displayName: 'OpenAI Click Reference',
        name: 'oppref',
        type: 'string',
        default: '',
        description: 'OpenAI-provided click attribution identifier (oppref) used for the OpenAI Conversions API',
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
        displayName: 'TikTok Click ID',
        name: 'ttclid',
        type: 'string',
        default: '',
        description: 'TikTok click ID (ttclid) used for TikTok Ads attribution',
      },
      {
        displayName: 'Timestamp',
        name: 'timestamp',
        type: 'string',
        default: '',
        description: 'Alias for Event Time. ISO date-time or Unix seconds/milliseconds.',
      },
      {
        displayName: 'UTM Campaign',
        name: 'utmCampaign',
        type: 'string',
        default: '',
        description:
          'UTM Campaign. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'UTM Content',
        name: 'utmContent',
        type: 'string',
        default: '',
        description:
          'UTM Content. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'UTM Medium',
        name: 'utmMedium',
        type: 'string',
        default: '',
        description:
          'UTM Medium. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'UTM Source',
        name: 'utmSource',
        type: 'string',
        default: '',
        description:
          'UTM Source. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'UTM Term',
        name: 'utmTerm',
        type: 'string',
        default: '',
        description:
          'UTM Term. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'Value With Currency',
        name: 'valueWithCurrency',
        type: 'string',
        default: '',
        description: 'Combined value and currency, e.g. 1,200 EUR',
      },
      {
        displayName: 'VibeTrack Ad',
        name: 'vtAd',
        type: 'string',
        default: '',
        description:
          'VibeTrack Ad. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'VibeTrack Ad Set',
        name: 'vtAdset',
        type: 'string',
        default: '',
        description:
          'VibeTrack Ad Set. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'VibeTrack Campaign',
        name: 'vtCampaign',
        type: 'string',
        default: '',
        description:
          'VibeTrack Campaign. Stored on the offline conversion and used to complete the campaign from a matched online conversion.',
      },
      {
        displayName: 'Wbraid',
        name: 'wbraid',
        type: 'string',
        default: '',
        description: 'Google wbraid click identifier',
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
  {
    displayName: 'Offline Conversion ID',
    name: 'conversionId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getOffline'],
      },
    },
    description: 'The conversionId returned when the offline conversion was sent',
  },
  {
    displayName: 'Filters',
    name: 'offlineFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversions'],
        operation: ['getManyOffline'],
      },
    },
    options: [
      {
        displayName: 'External ID',
        name: 'externalId',
        type: 'string',
        default: '',
        description: 'Look up a conversion by your own reference',
      },
      {
        displayName: 'From',
        name: 'from',
        type: 'dateTime',
        default: '',
        description: 'Conversion time at or after this time (event time, or receipt time when no event time was sent)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          {
            name: 'Error',
            value: 'ERROR',
          },
          {
            name: 'Partial',
            value: 'PARTIAL',
          },
          {
            name: 'Pending',
            value: 'PENDING',
          },
          {
            name: 'Sent',
            value: 'SENT',
          },
        ],
        default: 'SENT',
        description: 'Processing status of the offline conversion',
      },
      {
        displayName: 'To',
        name: 'to',
        type: 'dateTime',
        default: '',
        description: 'Conversion time at or before this time',
      },
      {
        displayName: 'Trigger Name or ID',
        name: 'triggerId',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getOfflineTriggers',
        },
        default: '',
        description:
          'Offline trigger to filter by. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
    ],
  },
];
