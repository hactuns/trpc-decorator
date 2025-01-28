import { updateClassMetadata } from '@/utils/metadata.js';

export function Input(schema?: any): ParameterDecorator {
  return updateClassMetadata({ schema });
}
