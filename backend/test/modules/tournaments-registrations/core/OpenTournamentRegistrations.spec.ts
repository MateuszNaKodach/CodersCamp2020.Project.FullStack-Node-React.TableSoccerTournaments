import {lastPublishedEventFrom, TestModule, testModule} from "../../../test-support/modules/shared/core/TestModule";
import {TournamentsRegistrationsModule} from "../../../../src/modules/tournaments-registrations/core/TournamentsRegistrationsModule";
import {OpenTournamentRegistrations} from "../../../../src/modules/tournaments-registrations/core/application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsWasOpened} from "../../../../src/modules/tournaments-registrations/core/domain/event/TournamentRegistrationsWasOpened";

describe('when OpenTournamentRegistrations', () => {

  test('then TournamentRegistrationsWasOpened', async () => {
    //Given
    const currentTime = new Date()
    const tournamentsRegistrations = testModule(TournamentsRegistrationsModule(() => currentTime))
    const tournamentId = "TournamentId"

    //When
    const openTournamentRegistrations = OpenTournamentRegistrations.command({tournamentId})
    await tournamentsRegistrations.commandBus.execute(openTournamentRegistrations)

    //Then
    const publishedEvents = tournamentsRegistrations.eventBus.storedEvents;
    expect(lastPublishedEventFrom(tournamentsRegistrations))
        .toStrictEqual(TournamentRegistrationsWasOpened.event({occurredAt: currentTime, tournamentId}))
  })

})

