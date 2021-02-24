import { ModuleCore } from '../../../shared/core/ModuleCore';
import { OpenTournamentRegistrationsCommandHandler } from './application/command/OpenTournamentRegistrationsCommandHandler';
import { DomainEventPublisher } from '../../../shared/core/application/event/DomainEventBus';
import { OpenTournamentRegistrations } from './application/command/OpenTournamentRegistrations';
import { TournamentRegistrationsRepository } from './application/TournamentRegistrationsRepository';
import { PlayerProfileWasCreated } from '../../player-profiles/core/domain/event/PlayerProfileWasCreated';
import { PlayerProfileWasCreatedEventHandler } from './application/event/PlayerProfileWasCreatedEventHandler';
import { Players } from './application/command/Players';
import { AvailablePlayersForTournament } from './application/command/AvailablePlayersForTournament';
import { RegisterPlayerForTournament } from './application/command/RegisterPlayerForTournament';
import { RegisterPlayerForTournamentCommandHandler } from './application/command/RegisterPlayerForTournamentCommandHandler';
import { CloseTournamentRegistrations } from './application/command/CloseTournamentRegistrations';
import { CloseTournamentRegistrationsCommandHandler } from './application/command/CloseTournamentRegistrationsCommandHandler';
import { FindTournamentRegistrationsById } from './application/query/FindTournamentRegistrationsById';
import { FindTournamentRegistrationsByIdQueryHandler } from './application/query/FindTournamentRegistrationsByIdQueryHandler';
import { FindAllTournamentRegistrations } from './application/query/FindAllTournamentRegistrations';
import { FindAllTournamentRegistrationsQueryHandler } from './application/query/FindAllTournamentRegistrationsQueryHandler';
import { CurrentTimeProvider } from '../../../shared/core/CurrentTimeProvider';

export function TournamentsRegistrationsModuleCore(
  eventPublisher: DomainEventPublisher,
  currentTimeProvider: CurrentTimeProvider,
  tournamentRegistrationsRepository: TournamentRegistrationsRepository,
  players: Players,
  availablePlayersForTournament: AvailablePlayersForTournament,
): ModuleCore {
  return {
    commandHandlers: [
      {
        commandType: OpenTournamentRegistrations,
        handler: new OpenTournamentRegistrationsCommandHandler(eventPublisher, currentTimeProvider, tournamentRegistrationsRepository),
      },
      {
        commandType: RegisterPlayerForTournament,
        handler: new RegisterPlayerForTournamentCommandHandler(
          eventPublisher,
          currentTimeProvider,
          tournamentRegistrationsRepository,
          availablePlayersForTournament,
        ),
      },
      {
        commandType: CloseTournamentRegistrations,
        handler: new CloseTournamentRegistrationsCommandHandler(eventPublisher, currentTimeProvider, tournamentRegistrationsRepository),
      },
    ],
    eventHandlers: [
      {
        eventType: PlayerProfileWasCreated,
        handler: new PlayerProfileWasCreatedEventHandler(players),
      },
    ],
    queryHandlers: [
      {
        queryType: FindTournamentRegistrationsById,
        handler: new FindTournamentRegistrationsByIdQueryHandler(tournamentRegistrationsRepository),
      },
      {
        queryType: FindAllTournamentRegistrations,
        handler: new FindAllTournamentRegistrationsQueryHandler(tournamentRegistrationsRepository),
      },
    ],
  };
}
