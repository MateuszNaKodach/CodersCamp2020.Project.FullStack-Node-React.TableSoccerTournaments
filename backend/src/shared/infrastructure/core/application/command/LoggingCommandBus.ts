import { CommandBus } from '../../../../core/application/command/CommandBus';
import { Command } from '../../../../core/application/command/Command';
import { CommandResult } from '../../../../core/application/command/CommandResult';
import { HasConstructor } from '../../../../../common/HasConstructor';
import { CommandHandler } from '../../../../core/application/command/CommandHandler';

export class LoggingCommandBus implements CommandBus {
  constructor(private readonly next: CommandBus) {}

  async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
    const result =  this.next.execute(command);
    console.log(`[LoggingCommandBus]: Command executed: `, Object.getPrototypeOf(command).constructor.name, JSON.stringify(command));
    console.log(`[LoggingCommandBus]: Command result: `, result);
    return result;
  }

  registerHandler<CommandType extends Command>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>): void {
    return this.next.registerHandler(commandType, handler);
  }
}
