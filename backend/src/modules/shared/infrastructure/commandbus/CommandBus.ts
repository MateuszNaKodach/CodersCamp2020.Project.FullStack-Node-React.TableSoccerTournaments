import {HasConstructor} from "../../../../common/hasConstructor";
import {CommandHandler} from "./CommandHandler";
import {Command} from "./InMemoryCommandBus";

export interface CommandBus {
  execute<CommandType extends Command, ResultType = any>(command: CommandType): Promise<ResultType>;

  registerCommandHandler<CommandType, ResultType>(
      commandType: HasConstructor<CommandType>,
      handler: CommandHandler<CommandType, ResultType>
  ): void;
}
