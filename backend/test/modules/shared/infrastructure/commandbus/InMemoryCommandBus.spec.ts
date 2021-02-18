import {CommandBus} from "../../../../../src/modules/shared/infrastructure/commandbus/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/commandbus/InMemoryCommandBus";
import {CommandHandler} from "../../../../../src/modules/shared/infrastructure/commandbus/CommandHandler";

describe('InMemoryCommandBus', () => {

  const commandBus: CommandBus = new InMemoryCommandBus();

  it('test', async () => {
    const startTournamentHandler: CommandHandler<StartTournament, StartTournamentResult> = {
      execute(command: StartTournament): Promise<StartTournamentResult> {
        return Promise.resolve({tournamentId: command.tournamentId});
      }
    }
    commandBus.registerHandler(StartTournament, StartTournamentResult, startTournamentHandler)
    const startTournament = new StartTournament({tournamentId: 'SampleId'})
    const commandResult = await commandBus.execute(StartTournamentResult, startTournament)

    expect(commandResult).toStrictEqual({tournamentId: 'SampleId'})
  })

})

class StartTournament {
  readonly tournamentId: string

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}


class StartTournamentResult {
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
