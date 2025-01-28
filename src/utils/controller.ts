import type { TRPCController } from '@/types/decorator.js';

export function createController<T extends { new (...args: any[]): {} }>(
  ControllerClass: T
): TRPCController {
  const CastedController = ControllerClass as T & { new (...args: any[]): TRPCController };

  return new CastedController();
}
