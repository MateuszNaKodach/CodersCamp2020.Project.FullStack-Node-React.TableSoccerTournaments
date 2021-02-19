import {CommandBus} from "../../../../../src/modules/shared/application/command/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus";
import {CommandHandler} from "../../../../../src/modules/shared/application/command/CommandHandler";
import {CommandResult} from "../../../../../src/modules/shared/application/command/CommandResult";
import Success = CommandResult.Success;
import Failure = CommandResult.Failure;
import {Command} from "../../../../../src/modules/shared/application/command/Command";

describe('InMemoryCommandBus', () => {

  it('CommandHandler with return value', async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.success({tournamentId: command.tournamentId});
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler)

    const startTournament = new StartTournament({tournamentId: 'SampleId'})
    const commandResult = await commandBus.execute(startTournament)
    commandResult.process(onSuccess, onFailure);

    expect(commandResult.isSuccess()).toBeTruthy()
    const returnValue = (commandResult as Success).value;
    expect(returnValue).toStrictEqual({tournamentId: 'SampleId'})
    expect(onFailure).not.toBeCalled();
    expect(onSuccess).toBeCalledWith(returnValue);
  })

  it('CommandHandler with failure', async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.failureDueTo(new Error('Tournament has already started!'));
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler)

    const startTournament = new StartTournament({tournamentId: 'SampleId'})
    const commandResult = await commandBus.execute(startTournament)
    commandResult.process(onSuccess, onFailure);

    expect(commandResult.isSuccess()).toBeFalsy()
    const failureReason = (commandResult as Failure).reason;
    expect(failureReason).toStrictEqual(new Error('Tournament has already started!'))
    expect(onFailure).toBeCalledWith(failureReason);
    expect(onSuccess).not.toBeCalled();
  })

  it('CommandHandler for command not registered', async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.failureDueTo(new Error('Tournament has already started!'));
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler)

    const registerPlayer = new RegisterPlayer({tournamentId: 'SampleId', playerId: 'PlayerId'})

    await expect(commandBus.execute(registerPlayer)).rejects.toThrowError(`The command handler for the "RegisterPlayer" command was not found!`)
  })

  it('cannot register two command handler for the same command type', () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler1: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.success()
      }
    }
    const startTournamentHandler2: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.success()
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler1)

    expect(() => commandBus.registerHandler(StartTournament, startTournamentHandler2)).toThrowError(`The command handler for the "StartTournament" command was already registered!`)
  })

})

class StartTournament implements Command {
  readonly tournamentId: string

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

class RegisterPlayer implements Command {
  readonly tournamentId: string
  readonly playerId: string

  constructor(props: { tournamentId: string, playerId: string }) {
    this.tournamentId = props.tournamentId;
    this.playerId = props.playerId
  }
}
