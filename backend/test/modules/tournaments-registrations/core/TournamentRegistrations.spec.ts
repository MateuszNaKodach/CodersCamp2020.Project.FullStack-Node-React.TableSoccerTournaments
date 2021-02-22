import {TestModule, testModule} from "../../../test-support/modules/shared/core/TestModule";
import {TournamentsRegistrationsModule} from "../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModule";
import {OpenTournamentRegistrations} from "../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsWasOpened} from "../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWasOpened";
import {CommandResult} from "../../../../src/modules/shared/application/command/CommandResult";
import {InMemoryTournamentRegistrationsRepository} from "../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository";
import {InMemoryPlayers} from "../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers";
import {RegisterPlayerForTournament} from "../../../../src/modules/tournaments-registrations/core/application/command/RegisterPlayerForTournament";
import {PlayerProfileWasCreated} from "../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated";
import {janKowalski} from "../../../test-support/modules/shared/core/people";
import {PlayerWasRegisteredForTournament} from "../../../../src/modules/tournaments-registrations/core/domain/event/PlayerWasRegisteredForTournament";
import Failure = CommandResult.Failure;
import {CloseTournamentRegistrations} from "../../../../src/modules/tournaments-registrations/core/application/command/CloseTournamentRegistrations";
import {TournamentRegistrationsWasClosed} from "../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWasClosed";

describe('Tournament Registrations', () => {

  it('given not opened tournaments registrations, when open tournament registrations, then tournament registrations was opened', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    //When
    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    const commandResult = await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeTruthy()

    expect(tournamentsRegistrations.lastPublishedEvent())
        .toStrictEqual(new TournamentRegistrationsWasOpened({occurredAt: currentTime, tournamentId}))
  })

  it('given opened tournaments registrations, when try to open tournament registrations, then command should fail', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    //When
    const commandResult = await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeFalsy()
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Registrations was opened before!'))
  })

  it('given opened tournaments registrations, when try to register player without profile, then command should fail', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    //When
    const playerWithoutProfile = "NotExistingPlayer"
    const registerPlayerForTournament = new RegisterPlayerForTournament({tournamentId, playerId: playerWithoutProfile})
    const commandResult = await tournamentsRegistrations.executeCommand(registerPlayerForTournament)

    //Then
    expect(commandResult.isSuccess()).toBeFalsy()
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Player with id = NotExistingPlayer cannot take part in the tournament!'))
  })

  it('given opened tournaments registrations and player has profile, when register player, then player should be registered for the tournament', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    const playerId = "JanKowalskiId"
    const playerProfileWasCreated = new PlayerProfileWasCreated({occurredAt: currentTime, playerId, ...janKowalski})
    tournamentsRegistrations.publishEvent(playerProfileWasCreated)

    //When
    const registerPlayerForTournament = new RegisterPlayerForTournament({tournamentId, playerId})
    const commandResult = await tournamentsRegistrations.executeCommand(registerPlayerForTournament)

    //Then
    expect(commandResult.isSuccess()).toBeTruthy()
    expect(tournamentsRegistrations.lastPublishedEvent())
        .toStrictEqual(new PlayerWasRegisteredForTournament({occurredAt: currentTime, tournamentId, playerId}))
  })

  it('given opened tournaments registrations with 1 registered player, when try to close registrations, then command should fail', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId1", tournamentId);

    //When
    const closeTournamentRegistrations = new CloseTournamentRegistrations({tournamentId})
    const commandResult = await tournamentsRegistrations.executeCommand(closeTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeFalsy()
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Min players for tournament is 8, but only 1 players registered!'))
  })

  it('given opened tournaments registrations with 8 registered players, when close registrations, then registrations should be closed', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testTournamentsRegistrationsModule(currentTime);
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.executeCommand(openTournamentRegistrations)

    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId1", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId2", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId3", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId4", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId5", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId6", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId7", tournamentId);
    await registerPlayerForTournament(tournamentsRegistrations, "PlayerId8", tournamentId);

    //When
    const closeTournamentRegistrations = new CloseTournamentRegistrations({tournamentId})
    const commandResult = await tournamentsRegistrations.executeCommand(closeTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeTruthy()
    expect(tournamentsRegistrations.lastPublishedEvent())
        .toStrictEqual(new TournamentRegistrationsWasClosed({
          occurredAt: currentTime,
          tournamentId,
          participantsIds: ["PlayerId1", "PlayerId2", "PlayerId3", "PlayerId4", "PlayerId5", "PlayerId6", "PlayerId7", "PlayerId8"]
        }))
  })

})

function testTournamentsRegistrationsModule(currentTime: Date) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const inMemoryPlayers = new InMemoryPlayers();
  return testModule(
      (commandBus, eventBus, queryBus) =>
          TournamentsRegistrationsModule(eventBus, () => currentTime, tournamentRegistrationsRepository, inMemoryPlayers, inMemoryPlayers)
  );
}

async function registerPlayerForTournament(tournamentsRegistrations: TestModule, playerId: string, tournamentId: string) {
  const playerProfileWasCreated = new PlayerProfileWasCreated({occurredAt: new Date(), playerId, ...janKowalski})
  tournamentsRegistrations.publishEvent(playerProfileWasCreated)
  const registerPlayerForTournament = new RegisterPlayerForTournament({tournamentId, playerId})
  return await tournamentsRegistrations.executeCommand(registerPlayerForTournament);
}

