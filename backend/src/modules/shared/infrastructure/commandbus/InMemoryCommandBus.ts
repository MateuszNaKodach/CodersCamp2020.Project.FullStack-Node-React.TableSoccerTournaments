import {HasConstructor} from "../../../../common/hasConstructor";
import {CommandBus} from "./CommandBus";
import {CommandHandler} from "./CommandHandler";

export interface Command {

}

//TODO: Refactor for typing!
export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, { handler: CommandHandler, resultType: HasConstructor }>();

  execute<ResultType = any, CommandType extends Command = Command>(resultType: HasConstructor<ResultType>, command: CommandType): Promise<ResultType> {
    const commandTypeName: CommandTypeName = Object.getPrototypeOf(command).constructor.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (!commandHandler || commandHandler.resultType.name !== resultType.name) {
      throw new CommandHandlerNotFoundException(commandTypeName)
    }
    return commandHandler.handler.execute(command)
  }

  registerHandler<CommandType extends Command, ResultType = any>(commandType: HasConstructor<CommandType>, resultType: HasConstructor<ResultType>, handler: CommandHandler<CommandType, ResultType>) {
    const commandTypeName: CommandTypeName = commandType.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (commandHandler) {
      throw new Error('Command handler already registered!')
    }
    this.handlers.set(commandTypeName, {handler, resultType})
  }

}

export class CommandHandlerNotFoundException extends Error {
  constructor(commandName: string) {
    super(
        `The command handler for the "${commandName}" command was not found!`,
    );
  }
}

type CommandTypeName = string;
