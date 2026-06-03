import { INodeProperties } from 'n8n-workflow';

export const attributionOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['attribution'],
      },
    },
    options: [
      {
        name: 'Aggregate',
        value: 'aggregate',
        description: 'Aggregate attribution data for selected identifiers',
        action: 'Aggregate attribution data',
      },
    ],
    default: 'aggregate',
  },
];

export const attributionFields: INodeProperties[] = [
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
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description:
      'Project to aggregate attribution for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Level',
    name: 'level',
    type: 'options',
    options: [
      {
        name: 'Campaign',
        value: 'campaign',
      },
      {
        name: 'Ad Set',
        value: 'adset',
      },
      {
        name: 'Ad',
        value: 'ad',
      },
    ],
    default: 'campaign',
    required: true,
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'Attribution aggregation level',
  },
  {
    displayName: 'IDs',
    name: 'ids',
    type: 'string',
    default: '',
    required: true,
    placeholder: '123,456 or ["123","456"]',
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'Campaign, ad set, or ad identifiers as comma-separated values or a JSON array',
  },
  {
    displayName: 'From',
    name: 'from',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'Start date for the aggregation range',
  },
  {
    displayName: 'To',
    name: 'to',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'End date for the aggregation range',
  },
  {
    displayName: 'Selected Conversion Triggers',
    name: 'selectedConversionTriggers',
    type: 'json',
    default: '',
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'Selected conversion triggers as JSON array',
  },
  {
    displayName: 'ID Parameter Mapping',
    name: 'idParameterMapping',
    type: 'json',
    default: '',
    displayOptions: {
      show: {
        resource: ['attribution'],
        operation: ['aggregate'],
      },
    },
    description: 'ID parameter mapping as JSON object',
  },
];
