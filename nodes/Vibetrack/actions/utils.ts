import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';

export function addOptionalField(
  target: IDataObject,
  name: string,
  value: string | number | boolean | IDataObject | IDataObject[] | undefined,
): void {
  if (value === undefined || value === '') return;
  target[name] = value;
}

export function parseJsonParameter(
  executeFunctions: IExecuteFunctions,
  value: string,
  itemIndex: number,
  fieldName: string,
): IDataObject | IDataObject[] | undefined {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as IDataObject | IDataObject[];
  } catch {
    throw new NodeOperationError(executeFunctions.getNode(), `${fieldName} must contain valid JSON`, { itemIndex });
  }
}

export function collectNonEmpty(group: IDataObject | undefined): IDataObject | undefined {
  if (!group) return undefined;

  const result: IDataObject = {};
  for (const [key, value] of Object.entries(group)) {
    if (value === undefined || value === null || value === '') continue;
    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function parseStringList(value: string): string[] {
  if (!value) return [];

  const trimmed = value.trim();
  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((entry) => String(entry)).filter((entry) => entry !== '');
    }
  }

  return trimmed
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry !== '');
}
