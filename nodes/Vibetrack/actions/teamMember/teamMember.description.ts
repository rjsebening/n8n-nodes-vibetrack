import { INodeProperties } from 'n8n-workflow';

export const teamMemberOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
      },
    },
    options: [
      {
        name: 'Add or Invite',
        value: 'addOrInvite',
        description: 'Add an existing user or send an invitation',
        action: 'Add or invite a team member',
      },
    ],
    default: 'addOrInvite',
  },
];

export const teamMemberFields: INodeProperties[] = [
  {
    displayName: 'Scope',
    name: 'scope',
    type: 'options',
    options: [
      {
        name: 'Project',
        value: 'project',
      },
      {
        name: 'Workspace',
        value: 'workspace',
      },
    ],
    default: 'project',
    required: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['addOrInvite'],
      },
    },
    description: 'Whether to grant project-level or workspace-level access',
  },
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
        resource: ['teamMember'],
        operation: ['addOrInvite'],
        scope: ['project'],
      },
    },
    description:
      'Project to grant access to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Workspace ID',
    name: 'workspaceId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['addOrInvite'],
        scope: ['workspace'],
      },
    },
    description: 'Workspace ID to grant access to',
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
        resource: ['teamMember'],
        operation: ['addOrInvite'],
      },
    },
    description: 'Email address of the user to add or invite',
  },
  {
    displayName: 'Access Level',
    name: 'accessLevel',
    type: 'options',
    options: [
      {
        name: 'Admin',
        value: 'ADMIN',
      },
      {
        name: 'Editor',
        value: 'EDITOR',
      },
      {
        name: 'Read Only',
        value: 'READ_ONLY',
      },
    ],
    default: 'READ_ONLY',
    required: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['addOrInvite'],
      },
    },
    description: 'Access level to grant. Owner access cannot be granted through the public API.',
  },
];
