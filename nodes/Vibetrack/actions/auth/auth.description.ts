import { INodeProperties } from 'n8n-workflow';

export const authOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['auth'],
      },
    },
    options: [
      {
        name: 'Validate',
        value: 'validate',
        description: 'Validate the API key and return authenticated user metadata',
        action: 'Validate API key',
      },
    ],
    default: 'validate',
  },
];

export const authFields: INodeProperties[] = [];
