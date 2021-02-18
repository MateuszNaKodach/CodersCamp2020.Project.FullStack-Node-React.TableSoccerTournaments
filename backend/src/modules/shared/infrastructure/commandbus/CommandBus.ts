import {HasConstructor} from "../../../../common/hasConstructor";
import {CommandHandler} from "./CommandHandler";
import {Command} from "./InMemoryCommandBus";

export interface CommandBus {
  execute<ResultType = any, CommandType extends Command = Command>(resultType: HasConstructor<ResultType>, command: CommandType): Promise<ResultType>;

  registerHandler<CommandType extends Command, ResultType = any>(commandType: HasConstructor<CommandType>, resultType: HasConstructor<ResultType>, handler: CommandHandler<CommandType, ResultType>): void

}
