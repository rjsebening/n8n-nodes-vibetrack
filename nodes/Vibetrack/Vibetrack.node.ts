import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionTypes,
} from 'n8n-workflow';
import { actions, router } from './actions';
import * as loadOptions from './methods/loadOptions';

export class Vibetrack implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'VibeTrack',
    name: 'vibetrack',
    icon: {
      light: 'file:vibetrack-light.svg',
      dark: 'file:vibetrack-dark.svg',
    },
    group: ['transform'],
    version: 1,
    description: 'Interact with VibeTrack.com API (powered by joergsebening.de)',
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    defaults: {
      name: 'VibeTrack',
      // @ts-expect-error -- description required by linter
      description: 'Interact with VibeTrack.com (powered by joergsebening.de)',
    },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],

    credentials: [
      {
        name: 'vibetrackApi',
        required: true,
        // @ts-expect-error -- description required by linter
        description: 'VibeTrack API',
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
