import {CommandBus} from "../../../../../src/modules/shared/application/command/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/modules/shared/infrastructure/command/InMemoryCommandBus";
import {CommandHandler} from "../../../../../src/modules/shared/application/command/CommandHandler";
import {CommandResult} from "../../../../../src/modules/shared/application/command/CommandResult";
import {RegisterPlayer, StartTournament} from "./CommandsTestFixtures";
import Success = CommandResult.Success;
import Failure = CommandResult.Failure;

/**
 * //HINT
 * W jaki sposób można pisać zagnieżdżone testy. To jedna z opcji.
 * Czytelnie to wygląda w raporcie, ale może trochę ciężej się odnaleźć w samym kodzie.
 * Zmniejszona jest też duplikacja kodu.
 */
describe('InMemoryCommandBus', () => {

  describe('given registered command handler for StartTournament returns success value', () => {

    let commandBus: CommandBus;

    beforeEach(() => {
      commandBus = new InMemoryCommandBus();
      const startTournamentHandler: CommandHandler<StartTournament> = {
        async execute(command: StartTournament): Promise<CommandResult> {
          return CommandResult.success({tournamentId: command.tournamentId});
        }
      }
      commandBus.registerHandler(StartTournament, startTournamentHandler)
    })

    describe('when command StartTournament is executed', () => {
      const startTournament = new StartTournament({tournamentId: 'SampleId'})
      let commandResult: CommandResult
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      beforeEach(async () => {
        commandResult = await commandBus.execute(startTournament)
      })

      it('then result is success', () => {
        expect(commandResult.isSuccess()).toBeTruthy()
        expect(commandResult).toBeInstanceOf(Success)
        expect((commandResult as Success).value).toStrictEqual({tournamentId: 'SampleId'})
      })

      it('then result is not failure', () => {
        expect(commandResult).not.toBeInstanceOf(Failure)
      })

      describe('and command result is processed', () => {

        beforeEach(() => {
          commandResult.process(onSuccess, onFailure);
        })

        it('then onSuccess callback should be called', () => {
          expect(onSuccess).toBeCalledWith((commandResult as Success).value);
        })

        it('then onFailure callback should not be called', () => {
          expect(onFailure).not.toBeCalled();
        })

      })

    })

    it('when try to register another command handler for StartTournament, then registering should fail', () => {
      const startTournamentHandler2: CommandHandler<StartTournament> = {
        async execute(command: StartTournament): Promise<CommandResult> {
          return CommandResult.success()
        }
      }

      expect(() => commandBus.registerHandler(StartTournament, startTournamentHandler2))
          .toThrowError(`The command handler for the "StartTournament" command was already registered!`)
    })


    it('when try to execute command without registered handler, then executing should fail', async () => {
      const registerPlayer = new RegisterPlayer({tournamentId: 'SampleId', playerId: 'PlayerId'})

      await expect(commandBus.execute(registerPlayer)).rejects
          .toThrowError(`The command handler for the "RegisterPlayer" command was not found!`)
    })

  })


  describe('given registered command handler for StartTournament returns failure reason', () => {

    let commandBus: CommandBus;

    beforeEach(() => {
      commandBus = new InMemoryCommandBus();
      const startTournamentHandler: CommandHandler<StartTournament> = {
        async execute(command: StartTournament): Promise<CommandResult> {
          return CommandResult.failureDueTo(new Error('Tournament has already started!'));
        }
      }
      commandBus.registerHandler(StartTournament, startTournamentHandler)
    })

    describe('when command StartTournament is executed', () => {
      const startTournament = new StartTournament({tournamentId: 'SampleId'})
      let commandResult: CommandResult
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      beforeEach(async () => {
        commandResult = await commandBus.execute(startTournament)
      })

      it('then result is failure', () => {
        expect(commandResult.isSuccess()).toBeFalsy()
        expect(commandResult).toBeInstanceOf(Failure)
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament has already started!'))
      })

      it('then result is not success', () => {
        expect(commandResult).not.toBeInstanceOf(Success)
      })

      describe('and command result is processed', () => {

        beforeEach(() => {
          commandResult.process(onSuccess, onFailure);
        })

        it('then onSuccess callback should not be called', () => {
          expect(onSuccess).not.toBeCalled();
        })

        it('then onFailure callback should be called', () => {
          expect(onFailure).toBeCalledWith((commandResult as Failure).reason);
        })

      })

    })

    it('when try to register another command handler for StartTournament, then registering should fail', () => {
      const startTournamentHandler2: CommandHandler<StartTournament> = {
        async execute(command: StartTournament): Promise<CommandResult> {
          return CommandResult.success()
        }
      }

      expect(() => commandBus.registerHandler(StartTournament, startTournamentHandler2))
          .toThrowError(`The command handler for the "StartTournament" command was already registered!`)
    })


    it('when try to execute command without registered handler, then executing should fail', async () => {
      const registerPlayer = new RegisterPlayer({tournamentId: 'SampleId', playerId: 'PlayerId'})

      await expect(commandBus.execute(registerPlayer)).rejects
          .toThrowError(`The command handler for the "RegisterPlayer" command was not found!`)
    })

  })


})

