import {CommandBus} from "../../../../core/application/command/CommandBus";
import {Command} from "../../../../core/application/command/Command";
import {CommandResult} from "../../../../core/application/command/CommandResult";
import {HasConstructor} from "../../../../../common/HasConstructor";
import {CommandHandler} from "../../../../core/application/command/CommandHandler";

export class RetryCommandBus implements CommandBus {

  constructor(private readonly next: CommandBus, private readonly maxRetries: number) {
  }

  async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
    let result: CommandResult | undefined = undefined
    for (let retry = 0; (result === undefined || !result.isSuccess()) && retry <= this.maxRetries; retry++) {
      result = await this.next.execute(command)
    }
    return result ?? CommandResult.failureDueTo(new Error(`Unknown command result after retries ${this.maxRetries}.`));
  }

  registerHandler<CommandType extends Command>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>): void {
    return this.next.registerHandler(commandType, handler)
  }
}
