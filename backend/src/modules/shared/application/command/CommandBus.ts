import {HasConstructor} from "../../../../common/HasConstructor";
import {CommandHandler} from "./CommandHandler";
import {CommandResult} from "./CommandResult";
import {Command} from "./Command";

export interface CommandBus {
  execute<CommandType extends Command>(command: CommandType): Promise<CommandResult>;

  registerHandler<CommandType>(
      commandType: HasConstructor<CommandType>,
      handler: CommandHandler<CommandType>
  ): void;
}
