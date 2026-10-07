import { INodeProperties } from 'n8n-workflow';

export const magicLinkOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['magicLink'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a Magic Link on a verified custom domain',
        action: 'Create a magic link',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a Magic Link',
        action: 'Get a magic link',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many Magic Links of a project, newest first',
        action: 'Get many magic links',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a Magic Link. Set Active to false to deactivate it.',
        action: 'Update a magic link',
      },
    ],
    default: 'getAll',
  },
];

export const magicLinkFields: INodeProperties[] = [
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
        resource: ['magicLink'],
        operation: ['create', 'get', 'getAll', 'update'],
      },
    },
    description:
      'Project the Magic Link belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Magic Link Name or ID',
    name: 'id',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getMagicLinks',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['get', 'update'],
      },
    },
    description:
      'Magic Link to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['create'],
      },
    },
    description: 'Name of the Magic Link (max. 120 characters).',
  },
  {
    displayName: 'Target URL',
    name: 'targetUrl',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'https://example.com/landingpage',
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['create'],
      },
    },
    description: 'A web address, email address, mailto URL, phone number or tel URL',
  },
  {
    displayName: 'Domain',
    name: 'domain',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'go.example.com',
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['create'],
      },
    },
    description:
      'An active, verified custom-domain host configured for this project. Cannot be changed after creation.',
  },
  {
    displayName: 'Back-Half',
    name: 'backHalf',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'summer-sale',
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['create'],
      },
    },
    description:
      'Path segment of the Magic Link (letters, digits, "_" and "-", max. 63 characters). Normalized to lowercase. Cannot be changed after creation.',
  },
  {
    displayName: 'Conversion Tracking Enabled',
    name: 'conversionTrackingEnabled',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['create'],
      },
    },
    description: 'Whether clicks on the Magic Link are tracked as conversions',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['magicLink'],
        operation: ['update'],
      },
    },
    description: 'Fields to update. Domain and back-half cannot be changed.',
    options: [
      {
        displayName: 'Active',
        name: 'active',
        type: 'boolean',
        default: true,
        description: 'Whether the Magic Link is active. Set to false to deactivate it.',
      },
      {
        displayName: 'Conversion Tracking Enabled',
        name: 'conversionTrackingEnabled',
        type: 'boolean',
        default: false,
        description: 'Whether clicks on the Magic Link are tracked as conversions',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the Magic Link (max. 120 characters).',
      },
      {
        displayName: 'Target URL',
        name: 'targetUrl',
        type: 'string',
        default: '',
        description: 'A web address, email address, mailto URL, phone number or tel URL',
      },
    ],
  },
];
