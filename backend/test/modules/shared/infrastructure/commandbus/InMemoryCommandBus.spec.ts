import {CommandBus} from "../../../../../src/modules/shared/infrastructure/command/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus";
import {CommandHandler} from "../../../../../src/modules/shared/infrastructure/command/CommandHandler";
import {CommandResult} from "../../../../../src/modules/shared/application/command/CommandResult";
import Success = CommandResult.Success;
import Failure = CommandResult.Failure;

describe('InMemoryCommandBus', () => {

  it('CommandHandler with return value', async () => {
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.success({tournamentId: command.tournamentId});
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler)

    const startTournament = new StartTournament({tournamentId: 'SampleId'})
    const commandResult = await commandBus.execute(startTournament)

    expect(commandResult.isSuccess()).toBeTruthy()
    expect((commandResult as Success).value).toStrictEqual({tournamentId: 'SampleId'})
  })

  it('CommandHandler with failure', async () => {
    const commandBus: CommandBus = new InMemoryCommandBus();
    const startTournamentHandler: CommandHandler<StartTournament> = {
      async execute(command: StartTournament): Promise<CommandResult> {
        return CommandResult.failureDueTo(new Error('Tournament has already started!'));
      }
    }
    commandBus.registerHandler(StartTournament, startTournamentHandler)

    const startTournament = new StartTournament({tournamentId: 'SampleId'})
    const commandResult = await commandBus.execute(startTournament)

    expect(commandResult.isSuccess()).toBeFalsy()
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament has already started!'))
  })

})

class StartTournament {
  readonly tournamentId: string

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

class RegisterPlayer {
  readonly tournamentId: string
  readonly playerId: string

  constructor(props: { tournamentId: string, playerId: string }) {
    this.tournamentId = props.tournamentId;
    this.playerId = props.playerId
  }
}
