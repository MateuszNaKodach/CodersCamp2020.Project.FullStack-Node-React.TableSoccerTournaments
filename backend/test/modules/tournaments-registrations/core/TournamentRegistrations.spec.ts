import {testModule} from "../../../test-support/modules/shared/core/TestModule";
import {TournamentsRegistrationsModule} from "../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModule";
import {OpenTournamentRegistrations} from "../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsWasOpened} from "../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWasOpened";
import {CommandResult} from "../../../../src/modules/shared/application/command/CommandResult";
import {InMemoryTournamentRegistrationsRepository} from "../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository";
import {InMemoryPlayers} from "../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers";
import Failure = CommandResult.Failure;
import {RegisterPlayerForTournament} from "../../../../src/modules/tournaments-registrations/core/application/command/RegisterPlayerForTournament";
import {PlayerProfileWasCreated} from "../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated";
import {janKowalski} from "../../../test-support/modules/shared/core/persons";
import {PlayerWasRegisteredForTournament} from "../../../../src/modules/tournaments-registrations/core/domain/event/PlayerWasRegisteredForTournament";

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


})


function testTournamentsRegistrationsModule(currentTime: Date) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const inMemoryPlayers = new InMemoryPlayers();
  return testModule(
      (commandBus, eventBus, queryBus) =>
          TournamentsRegistrationsModule(eventBus, () => currentTime, tournamentRegistrationsRepository, inMemoryPlayers, inMemoryPlayers)
  );
}

