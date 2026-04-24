import { INodeProperties } from 'n8n-workflow';
import * as project from './project/project.description';
import * as conversionEvent from './conversionEvent/conversionEvent.description';

export { router } from './router';

export const actions: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Conversion Event', value: 'conversionEvent' },
			{ name: 'Project', value: 'project' },
		],
		default: 'project',
	},
	...project.projectOperations,
	...project.projectFields,
	...conversionEvent.conversionEventOperations,
	...conversionEvent.conversionEventFields,
];
