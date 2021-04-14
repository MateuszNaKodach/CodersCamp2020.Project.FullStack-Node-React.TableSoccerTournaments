import { CommandBus, CommandPublisher } from '../../../../src/shared/core/application/command/CommandBus';
import { CommandResult } from '../../../../src/shared/core/application/command/CommandResult';
import { Command } from '../../../../src/shared/core/application/command/Command';
import { HasConstructor } from '../../../../src/common/HasConstructor';
import { CommandHandler } from '../../../../src/shared/core/application/command/CommandHandler';

export function CommandBusMock(alwaysReturn: CommandResult = CommandResult.success()): CommandBus & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      executeCalls(command);
      return alwaysReturn;
    },
    registerHandler<CommandType>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>): void {},
    executeCalls,
  };
}

export function CommandBusResultsMock(results: CommandResult[]): CommandBus & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      const result = results[executeCalls.mock.calls.length];
      executeCalls(command);
      return result;
    },
    registerHandler<CommandType>(commandType: HasConstructor<CommandType>, handler: CommandHandler<CommandType>): void {},
    executeCalls,
  };
}
