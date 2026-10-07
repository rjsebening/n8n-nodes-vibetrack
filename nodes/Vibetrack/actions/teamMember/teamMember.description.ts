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
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve the team of a project or workspace, including pending invitations',
        action: 'Get many team members',
      },
      {
        name: 'Remove',
        value: 'remove',
        description: "Remove a user's access or revoke a pending invitation",
        action: 'Remove a team member or revoke an invitation',
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
        operation: ['addOrInvite', 'getAll', 'remove'],
      },
    },
    description: 'Whether to work on project-level or workspace-level access',
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
        operation: ['addOrInvite', 'getAll', 'remove'],
        scope: ['project'],
      },
    },
    description:
      'Project to use. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        operation: ['addOrInvite', 'getAll', 'remove'],
        scope: ['workspace'],
      },
    },
    description: 'ID of the workspace to use',
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
  {
    displayName: 'Remove',
    name: 'removeTarget',
    type: 'options',
    options: [
      {
        name: 'Member',
        value: 'member',
        description: "Remove an existing user's access",
      },
      {
        name: 'Invitation',
        value: 'invitation',
        description: 'Revoke a pending invitation',
      },
    ],
    default: 'member',
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['remove'],
      },
    },
    description:
      'What to remove. Owners and the API key user cannot be removed. Users with workspace access must be removed from the workspace.',
  },
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['remove'],
        removeTarget: ['member'],
      },
    },
    description: 'ID of the user to remove (see Get Many)',
  },
  {
    displayName: 'Invitation ID',
    name: 'invitationId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['teamMember'],
        operation: ['remove'],
        removeTarget: ['invitation'],
      },
    },
    description: 'ID of the pending invitation to revoke (see Get Many)',
  },
];
