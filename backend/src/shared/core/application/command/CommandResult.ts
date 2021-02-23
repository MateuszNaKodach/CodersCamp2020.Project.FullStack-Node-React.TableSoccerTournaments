export interface CommandResult {
  isSuccess(): boolean;

  process(onSuccess: (value: any) => any, onFailure: (reason: Error) => any): any;
}

export namespace CommandResult {
  export class Success implements CommandResult {
    constructor(public readonly value: any | undefined) {}

    isSuccess(): boolean {
      return true;
    }

    process(onSuccess: (value: any) => any, onFailure: (reason: Error) => any): any {
      return onSuccess(this.value);
    }
  }

  export class Failure implements CommandResult {
    constructor(public readonly reason: Error = new Error('Unknown error.')) {}

    isSuccess(): boolean {
      return false;
    }

    process(onSuccess: (value: any) => any, onFailure: (reason: Error) => any): any {
      return onFailure(this.reason);
    }
  }

  export const success = (value: any = undefined) => new Success(value);

  export const failureDueTo = (reason: Error = new Error('Unknown error.')) => new Failure(reason);

  export function isSuccess(result: CommandResult): result is Success {
    return result.isSuccess();
  }

  export function isFailure(result: CommandResult): result is Failure {
    return !result.isSuccess();
  }
}
