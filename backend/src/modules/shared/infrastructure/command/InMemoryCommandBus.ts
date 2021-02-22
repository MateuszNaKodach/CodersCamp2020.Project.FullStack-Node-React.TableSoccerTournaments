import { HasConstructor } from '../../../../common/HasConstructor';
import { CommandBus } from '../../application/command/CommandBus';
import { CommandHandler } from '../../application/command/CommandHandler';
import { Command } from '../../application/command/Command';
import { CommandResult } from '../../application/command/CommandResult';

export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, CommandHandler>();

  execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
    const commandTypeName: CommandTypeName = Object.getPrototypeOf(command).constructor.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (!commandHandler) {
      return Promise.reject(new CommandHandlerNotFoundException(commandTypeName));
    }
    return commandHandler.execute(command).catch((error) => CommandResult.failureDueTo(error));
  }

  registerHandler<CommandType extends Command>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>) {
    const commandTypeName: CommandTypeName = commandType.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (commandHandler) {
      throw new CommandHandlerAlreadyRegisteredException(commandTypeName);
    }
    this.handlers.set(commandTypeName, handler);
  }
}

type CommandTypeName = string;

class CommandHandlerNotFoundException extends Error {
  constructor(commandName: string) {
    super(`The command handler for the "${commandName}" command was not found!`);
  }
}

class CommandHandlerAlreadyRegisteredException extends Error {
  constructor(commandName: string) {
    super(`The command handler for the "${commandName}" command was already registered!`);
  }
}
