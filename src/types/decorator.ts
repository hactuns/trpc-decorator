export enum MethodType {
  Query = '_queries',
  Mutate = '_mutates',
}

export interface RouteItem {
  type: MethodType;
  path: string;
  function: Function;
  schema?: any;
}

export interface TRPCMethodDecorator {
  _routeItem?: Record<string | symbol, RouteItem>;
}

export interface TRPCController {
  _getRoutes: () => any;
  _setProcedure: (procedure: any) => this;
}
