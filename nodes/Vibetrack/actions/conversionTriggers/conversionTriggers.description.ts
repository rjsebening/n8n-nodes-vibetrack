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
        name: 'Create',
        value: 'create',
        description: 'Create an online trigger with a page rule or an offline trigger',
        action: 'Create a conversion trigger',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a conversion trigger, including deactivated triggers',
        action: 'Get a conversion trigger',
      },
      {
        name: 'Get Many',
        value: 'getManyOnline',
        description: 'Retrieve online and offline conversion triggers for a project',
        action: 'Get many conversion triggers',
      },
      {
        name: 'Get Many Offline',
        value: 'getManyOffline',
        description: 'Retrieve active offline conversion triggers for a project',
        action: 'Get many offline conversion triggers',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a conversion trigger. Set Active to false to deactivate it.',
        action: 'Update a conversion trigger',
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
        operation: ['create', 'get', 'getManyOffline', 'getManyOnline', 'update'],
      },
    },
    description:
      'Project the conversion triggers belong to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Include Inactive',
    name: 'includeInactive',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['getManyOnline'],
      },
    },
    description: 'Whether to include deactivated triggers',
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
  {
    displayName: 'Trigger Name or ID',
    name: 'id',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAllConversionTriggers',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['get', 'update'],
      },
    },
    description:
      'Conversion trigger to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
      },
    },
    description: 'Name of the trigger (max. 200 characters).',
  },
  {
    displayName: 'Type',
    name: 'triggerType',
    type: 'options',
    options: [
      {
        name: 'Online',
        value: 'ONLINE',
        description: 'Counts page views matching a page rule as conversions',
      },
      {
        name: 'Offline',
        value: 'OFFLINE',
        description: 'Receives offline conversions. Requires the Pro plan or an agency workspace.',
      },
    ],
    default: 'ONLINE',
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
      },
    },
    description: 'Type of the trigger. Cannot be changed later.',
  },
  {
    displayName: 'Match Type',
    name: 'matchType',
    type: 'options',
    options: [
      {
        name: 'Hostname',
        value: 'hostname',
      },
      {
        name: 'Path',
        value: 'path',
      },
      {
        name: 'URL',
        value: 'url',
      },
    ],
    default: 'path',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['ONLINE'],
      },
    },
    description:
      'What to compare: the page path (leading slash optional), the full page URL or the host. Homepage paths are not allowed.',
  },
  {
    displayName: 'Match Operator',
    name: 'matchOperator',
    type: 'options',
    options: [
      {
        name: 'Contains',
        value: 'contains',
      },
      {
        name: 'Equals',
        value: 'equals',
      },
      {
        name: 'Starts With',
        value: 'startsWith',
      },
    ],
    default: 'equals',
    required: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['ONLINE'],
      },
    },
  },
  {
    displayName: 'Match Value',
    name: 'matchValue',
    type: 'string',
    default: '',
    required: true,
    placeholder: '/danke',
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['ONLINE'],
      },
    },
    description: 'Value to compare against (max. 2000 characters).',
  },
  {
    displayName: 'Domain Name or ID',
    name: 'domainId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getDomains',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['ONLINE'],
      },
    },
    description:
      'Only count conversions on this project domain. Leave empty for all domains. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Contributes to ROAS',
    name: 'contributesToRoas',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['ONLINE'],
      },
    },
    description: 'Whether conversions of this trigger contribute to ROAS',
  },
  {
    displayName: 'Accept API Conversions',
    name: 'offlineSourceApi',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['OFFLINE'],
      },
    },
    description: 'Whether the trigger accepts offline conversions from the API (e.g. this node)',
  },
  {
    displayName: 'Offer in Zapier',
    name: 'offlineSourceZapier',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['create'],
        triggerType: ['OFFLINE'],
      },
    },
    description: 'Whether the trigger is offered in the VibeTrack Zapier app',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversionTriggers'],
        operation: ['update'],
      },
    },
    description:
      'Fields to update. The type cannot be changed. Triggers managed by a Magic Link or Facebook lead form cannot be changed.',
    options: [
      {
        displayName: 'Accept API Conversions',
        name: 'offlineSourceApi',
        type: 'boolean',
        default: true,
        description: 'Whether the trigger accepts offline conversions from the API. Offline triggers only.',
      },
      {
        displayName: 'Active',
        name: 'active',
        type: 'boolean',
        default: true,
        description: 'Whether the trigger is active. Set to false to deactivate it.',
      },
      {
        displayName: 'Contributes to ROAS',
        name: 'contributesToRoas',
        type: 'boolean',
        default: false,
        description: 'Whether conversions of this trigger contribute to ROAS. Online triggers only.',
      },
      {
        displayName: 'Match Rule',
        name: 'match',
        type: 'fixedCollection',
        default: {},
        description: 'Replaces the whole page rule. Online triggers only.',
        options: [
          {
            displayName: 'Rule',
            name: 'rule',
            values: [
              {
                displayName: 'Match Type',
                name: 'type',
                type: 'options',
                options: [
                  {
                    name: 'Hostname',
                    value: 'hostname',
                  },
                  {
                    name: 'Path',
                    value: 'path',
                  },
                  {
                    name: 'URL',
                    value: 'url',
                  },
                ],
                default: 'path',
              },
              {
                displayName: 'Match Operator',
                name: 'operator',
                type: 'options',
                options: [
                  {
                    name: 'Contains',
                    value: 'contains',
                  },
                  {
                    name: 'Equals',
                    value: 'equals',
                  },
                  {
                    name: 'Starts With',
                    value: 'startsWith',
                  },
                ],
                default: 'equals',
              },
              {
                displayName: 'Match Value',
                name: 'value',
                type: 'string',
                default: '',
                placeholder: '/danke',
              },
              {
                displayName: 'Domain ID',
                name: 'domainId',
                type: 'string',
                default: '',
                description: 'Only count conversions on this project domain. Leave empty for all domains.',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the trigger (max. 200 characters).',
      },
      {
        displayName: 'Offer in Zapier',
        name: 'offlineSourceZapier',
        type: 'boolean',
        default: false,
        description: 'Whether the trigger is offered in the VibeTrack Zapier app. Offline triggers only.',
      },
    ],
  },
];
