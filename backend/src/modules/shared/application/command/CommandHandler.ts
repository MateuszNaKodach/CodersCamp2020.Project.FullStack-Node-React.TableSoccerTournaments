import { CommandResult } from './CommandResult';

export interface CommandHandler<CommandType = any> {
  execute(command: CommandType): Promise<CommandResult>;
}
