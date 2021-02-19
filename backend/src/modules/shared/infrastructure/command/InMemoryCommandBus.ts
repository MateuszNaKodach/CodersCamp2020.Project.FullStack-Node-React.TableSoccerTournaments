import {HasConstructor} from "../../../../common/HasConstructor";
import {CommandBus} from "./CommandBus";
import {CommandHandler} from "./CommandHandler";
import {Command} from "../../application/command/Command";
import {CommandResult} from "../../application/command/CommandResult";

export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, CommandHandler>();

  execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
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

type CommandTypeName = string;

class CommandHandlerNotFoundException extends Error {
  constructor(commandName: string) {
    super(`The command handler for the "${commandName}" command was not found!`,);
  }
}
