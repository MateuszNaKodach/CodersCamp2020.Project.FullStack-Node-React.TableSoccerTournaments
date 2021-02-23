import { CommandPublisher } from '../../../../src/shared/core/application/command/CommandBus';
import { CommandResult } from '../../../../src/shared/core/application/command/CommandResult';
import { Command } from '../../../../src/shared/core/application/command/Command';

export function CommandPublisherMock(
  alwaysReturn: CommandResult = CommandResult.success(),
): CommandPublisher & { executeCalls: jest.Mock } {
  const executeCalls: jest.Mock = jest.fn();
  return {
    async execute<CommandType extends Command>(command: CommandType): Promise<CommandResult> {
      executeCalls(command);
      return alwaysReturn;
    },
    executeCalls,
  };
}
