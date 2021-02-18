import {HasConstructor} from "../../../../common/hasConstructor";
import {CommandBus} from "./CommandBus";
import {CommandHandler} from "./CommandHandler";

export interface Command {

}

export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, CommandHandler>();

  execute<CommandType extends Command>(command: CommandType): Promise<any> {
    const commandTypeName: CommandTypeName = Object.getPrototypeOf(command).constructor.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (!commandHandler) {
      throw new CommandHandlerNotFoundException(commandTypeName)
    }
    return commandHandler.execute(command)
  }

  registerHandler<CommandType extends Command>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>) {
    const commandTypeName: CommandTypeName = commandType.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (commandHandler) {
      throw new Error('Command handler already registered!')
    }
    this.handlers.set(commandTypeName, handler)
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
