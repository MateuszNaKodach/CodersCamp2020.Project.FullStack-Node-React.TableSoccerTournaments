import {AppModule} from "../../shared/AppModule";
import {OpenTournamentRegistrationsCommandHandler} from "./application/command/OpenTournamentRegistrationsCommandHandler";
import {DomainEventBus} from "../../shared/application/event/DomainEventBus";
import {OpenTournamentRegistrations} from "./application/command/OpenTournamentRegistrations";
import {TournamentRegistrationsRepository} from "./application/TournamentRegistrationsRepository";
import {PlayerProfileWasCreated} from "../../player-profiles/core/domain/event/PlayerProfileWasCreated";
import {PlayerProfileWasCreatedEventHandler} from "./application/event/PlayerProfileWasCreatedEventHandler";
import {Players} from "./application/command/Players";
import {AvailablePlayersForTournament} from "./application/command/AvailablePlayersForTournament";
import {RegisterPlayerForTournament} from "./application/command/RegisterPlayerForTournament";
import {RegisterPlayerForTournamentCommandHandler} from "./application/command/RegisterPlayerForTournamentCommandHandler";

export type CurrentTimeProvider = () => Date
export const TournamentsRegistrationsModule = (
    eventBus: DomainEventBus,
    currentTimeProvider: CurrentTimeProvider,
    tournamentRegistrationsRepository: TournamentRegistrationsRepository,
    players: Players,
    availablePlayersForTournament: AvailablePlayersForTournament) => {
  return {
    commandHandlers: [
      {
        commandType: OpenTournamentRegistrations,
        handler: new OpenTournamentRegistrationsCommandHandler(eventBus, currentTimeProvider, tournamentRegistrationsRepository)
      },
      {
        commandType: RegisterPlayerForTournament,
        handler: new RegisterPlayerForTournamentCommandHandler(eventBus, currentTimeProvider, tournamentRegistrationsRepository, availablePlayersForTournament)
      },
    ],
    eventHandlers: [
      {
        eventType: PlayerProfileWasCreated,
        handler: new PlayerProfileWasCreatedEventHandler(players)
      }
    ],
    queryHandlers: []
  } as AppModule
}
