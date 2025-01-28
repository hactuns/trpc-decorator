import { MethodType, type TRPCController, type TRPCMethodDecorator } from '@/types/decorator.js';

export function Controller(path: string) {
  return function <
    T extends {
      new (...args: any[]): {};
    } & TRPCMethodDecorator,
  >(constructor: T) {
    return class extends constructor implements TRPCController {
      publicCall: any;
      privateCall: any;

      constructor(...args: any[]) {
        super(...args);
        this.publicCall = undefined;
        this.privateCall = undefined;
      }

      _setProcedure(procedure: any) {
        this.publicCall = procedure;
        this.privateCall = procedure;

        return this;
      }

      _getRoutes() {
        return {
          [path]: Object.values(constructor._routeItem ?? {}).reduce((acc, cur) => {
            const caller = cur.schema ? this.publicCall?.input(cur.schema) : this.publicCall;

            return {
              ...acc,
              [cur.path]:
                cur.type === MethodType.Mutate
                  ? caller?.mutation((input: any) => cur.function(input))
                  : caller?.query((input: any) => cur.function(input)),
            };
          }, {}),
        };
      }
    };
  };
}
