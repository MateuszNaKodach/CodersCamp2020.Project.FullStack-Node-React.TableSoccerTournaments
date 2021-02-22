import {lastPublishedEventFrom, testModule} from "../../../test-support/modules/shared/core/TestModule";
import {TournamentsRegistrationsModule} from "../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModule";
import {OpenTournamentRegistrations} from "../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsWasOpened} from "../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWasOpened";
import {CommandResult} from "../../../../src/modules/shared/application/command/CommandResult";
import Failure = CommandResult.Failure;
import {InMemoryTournamentRegistrationsRepository} from "../../../../src/modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository";

describe('Tournament Registrations', () => {

  it('given not opened tournaments registrations, when open tournament registrations, then tournament registrations was opened', async () => {
    //Given
    const currentTime = new Date()
    const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
    const tournamentsRegistrations = testModule(
        (commandBus, eventBus, queryBus) => TournamentsRegistrationsModule(eventBus, () => currentTime, tournamentRegistrationsRepository)
    )
    const tournamentId = "TournamentId"

    //When
    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    const commandResult = await tournamentsRegistrations.commandBus.execute(openTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeTruthy()

    expect(lastPublishedEventFrom(tournamentsRegistrations))
        .toStrictEqual(new TournamentRegistrationsWasOpened({occurredAt: currentTime, tournamentId}))
  })

  it('given opened tournaments registrations, when try to open tournament registrations, then command should fail', async () => {
    //Given
    const currentTime = new Date()
    const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
    const tournamentsRegistrations = testModule(
        (commandBus, eventBus, queryBus) => TournamentsRegistrationsModule(eventBus, () => currentTime, tournamentRegistrationsRepository)
    )
    const tournamentId = "TournamentId"

    const openTournamentRegistrations = new OpenTournamentRegistrations({tournamentId})
    await tournamentsRegistrations.commandBus.execute(openTournamentRegistrations)

    //When
    const commandResult = await tournamentsRegistrations.commandBus.execute(openTournamentRegistrations)

    //Then
    expect(commandResult.isSuccess()).toBeFalsy()
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Registrations was opened before!'))
  })

})

