import {CommandResult} from "../../application/command/CommandResult";

export interface CommandHandler<CommandType = any> {
  execute(command: CommandType): Promise<CommandResult>
}
