export interface CommandHandler<CommandType = any, ResultType = any> {
  execute(command: CommandType): Promise<ResultType>
}
