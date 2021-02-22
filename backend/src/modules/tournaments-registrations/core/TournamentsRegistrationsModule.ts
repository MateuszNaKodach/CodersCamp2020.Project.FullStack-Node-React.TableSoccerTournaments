import {AppModule} from "../../shared/AppModule";
import {OpenTournamentRegistrationsCommandHandler} from "./application/command/OpenTournamentRegistrationsCommandHandler";
import {DomainEventBus} from "../../shared/application/event/DomainEventBus";
import {OpenTournamentRegistrations} from "./application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsRepository} from "./application/TournamentRegistrationsRepository";

export type CurrentTimeProvider = () => Date
export const TournamentsRegistrationsModule = (eventBus: DomainEventBus, currentTimeProvider: CurrentTimeProvider, tournamentRegistrationsRepository: TournamentRegistrationsRepository) => {
  return {
    commandHandlers: [
      {
        commandType: OpenTournamentRegistrations,
        handler: new OpenTournamentRegistrationsCommandHandler(eventBus, currentTimeProvider, tournamentRegistrationsRepository)
      }
    ],
    eventHandlers: [],
    queryHandlers: []
  } as AppModule
}
