export interface HasConstructor<T = any> extends Function {
  new (...args: any[]): T;
}
