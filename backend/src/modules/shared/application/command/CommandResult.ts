import Success = CommandResult.Success;
import Failure = CommandResult.Failure;

export interface CommandResult {
  isSuccess(): boolean

  process(onSuccess: (success: Success) => void, onFailure: (failure: Failure) => void): void
}

export namespace CommandResult {

  export class Success implements CommandResult {
    constructor(public readonly value: any | undefined) {
    }

    isSuccess(): boolean {
      return true;
    }

    process(onSuccess: (success: CommandResult.Success) => void, onFailure: (failure: CommandResult.Failure) => void): void {
      if (isFailure(this)) {
        onFailure(this)
      } else {
        onSuccess(this)
      }
    }

  }

  export class Failure implements CommandResult {
    constructor(public readonly reason: Error = new Error("Unknown error.")) {
    }

    isSuccess(): boolean {
      return false;
    }

    process(onSuccess: (success: CommandResult.Success) => void, onFailure: (failure: CommandResult.Failure) => void): void {
      if (isFailure(this)) {
        onFailure(this)
      } else {
        onSuccess(this)
      }
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

