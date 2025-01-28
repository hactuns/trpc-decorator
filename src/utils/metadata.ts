import type { MethodType, RouteItem, TRPCMethodDecorator } from '@/types/decorator.js';

export function setClassMetadata(path: string, type: MethodType) {
  return function <Key extends string | symbol = string>(
    target: Record<Key, any>,
    key: Key,
    descriptor: PropertyDescriptor
  ): void | PropertyDescriptor {
    const constructor = target.constructor as unknown as TRPCMethodDecorator;

    constructor._routeItem ??= {};
    constructor._routeItem = {
      [key]: {
        ...constructor._routeItem[key],
        type,
        path,
        function: target[key],
      },
    };

    Object.assign(target, { constructor });

    return descriptor;
  };
}

export function updateClassMetadata(payload?: Partial<RouteItem>) {
  return function <Key extends string | symbol | undefined = string>(
    target: Object,
    key: Key,
    _: number
  ): void | PropertyDescriptor {
    if (!key) {
      return;
    }

    const constructor = target.constructor as unknown as TRPCMethodDecorator;

    constructor._routeItem ??= {};
    constructor._routeItem = {
      [key]: {
        ...constructor._routeItem[key],
        ...payload,
      },
    };

    Object.assign(target, { constructor });
  };
}
