import { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['project'],
      },
    },
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many projects',
        action: 'Get many projects',
      },
    ],
    default: 'getAll',
  },
];

export const projectFields: INodeProperties[] = [];
