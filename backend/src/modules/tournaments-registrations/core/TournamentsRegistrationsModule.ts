import {AppModule} from "../../shared/AppModule";
import {OpenTournamentRegistrationsCommandHandler} from "./application/command/OpenTournamentRegistrationsCommandHandler";
import {DomainEventBus} from "../../shared/application/event/DomainEventBus";
import {OpenTournamentRegistrations} from "./application/command/OpenTournamentRegistrations";

export type CurrentTimeProvider = () => Date
export const TournamentsRegistrationsModule = (eventBus: DomainEventBus, currentTimeProvider: CurrentTimeProvider) => {
  return {
    commandHandlers: [
      {
        commandType: OpenTournamentRegistrations,
        handler: new OpenTournamentRegistrationsCommandHandler(eventBus, currentTimeProvider)
      }
    ],
    eventHandlers: [],
    queryHandlers: []
  } as AppModule
}
