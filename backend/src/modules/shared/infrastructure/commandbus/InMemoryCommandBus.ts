import {HasConstructor} from "../../../../common/hasConstructor";
import {CommandBus} from "./CommandBus";
import {CommandHandler} from "./CommandHandler";

export interface Command {

}

export class InMemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandTypeName, CommandHandler>();

  execute<CommandType extends Command>(command: CommandType): Promise<any> {
    const commandTypeName = InMemoryCommandBus.commandType(command);
    const commandHandler = this.handlers.get(commandTypeName);
    if (!commandHandler) {
      throw new CommandHandlerNotFoundException(commandTypeName)
    }
    return commandHandler.execute(command)
  }

  registerCommandHandler<CommandType extends Command>(commandType: HasConstructor<CommandType>,
                                                  handler: CommandHandler<CommandType>
  ) {
    const commandTypeName = commandType.name;
    const commandHandler = this.handlers.get(commandTypeName);
    if (commandHandler) {
      throw new Error('Command handler already registered!')
    }
    this.handlers.set(commandTypeName, handler)
  }

  private static commandType(command: Command): CommandTypeName {
    const {constructor} = Object.getPrototypeOf(command);
    return constructor.name as string;
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
