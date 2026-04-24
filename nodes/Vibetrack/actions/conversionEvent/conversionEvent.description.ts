import { INodeProperties } from 'n8n-workflow';

export const conversionEventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversionEvent'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve many conversion events for a project',
				action: 'Get many conversion events',
			},
		],
		default: 'getAll',
	},
];

export const conversionEventFields: INodeProperties[] = [
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
				resource: ['conversionEvent'],
				operation: ['getAll'],
			},
		},
		description:
			'Project to list conversion events for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
