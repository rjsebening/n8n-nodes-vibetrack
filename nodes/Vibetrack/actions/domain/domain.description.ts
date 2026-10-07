import { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['domain'],
      },
    },
    options: [
      {
        name: 'Check Tracking',
        value: 'checkTracking',
        description: 'Check that the VibeTrack tracker and cookie script are installed on the domain',
        action: 'Check the tracking installation of a domain',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Add a website domain to a project and register it for tracking',
        action: 'Add a domain to a project',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve the domains of a project',
        action: 'Get many domains',
      },
    ],
    default: 'getAll',
  },
];

export const domainFields: INodeProperties[] = [
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
        resource: ['domain'],
        operation: ['checkTracking', 'create', 'getAll'],
      },
    },
    description:
      'Project the domain belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Domain Name or ID',
    name: 'id',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getDomains',
      loadOptionsDependsOn: ['projectId'],
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['domain'],
        operation: ['checkTracking'],
      },
    },
    description:
      'Domain to check. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'shop.example.com',
    displayOptions: {
      show: {
        resource: ['domain'],
        operation: ['create'],
      },
    },
    description:
      'Host or URL of the website. The domain stays inactive until the tracker reports from it or a tracking check passes.',
  },
];
