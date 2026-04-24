import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { actions, router } from './actions';
import * as loadOptions from './methods/loadOptions';

export class Vibetrack implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vibetrack',
		name: 'vibetrack',
		icon: 'file:vibetrack.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with VibeTrack.com API (powered by joergsebening.de)',
		defaults: {
			name: 'Vibetrack',
			// @ts-expect-error -- description required by linter
			description: 'Interact with VibeTrack.com (powered by joergsebening.de)',
		},
		inputs: ['main'],
		outputs: ['main'],

		credentials: [
			{
				name: 'vibetrackApi',
				required: true,
				// @ts-expect-error -- description required by linter
				description: 'Vibetrack API',
			},
		],
		properties: actions,
		usableAsTool: true,
	};

	methods = {
		loadOptions,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return await router.call(this);
	}
}
