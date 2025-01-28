import { MethodType } from '@/types/decorator.js';
import { setClassMetadata } from '@/utils/metadata.js';

export function Query<T extends string>(path: T): MethodDecorator {
  return setClassMetadata(path, MethodType.Query);
}
