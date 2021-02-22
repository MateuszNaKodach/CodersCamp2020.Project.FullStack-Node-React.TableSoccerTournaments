import { config } from 'dotenv';
import { startRestApi } from './shared/infrastructure/restapi/Server';
import { CommandBus } from './shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from './shared/infrastructure/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from './shared/infrastructure/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from './shared/infrastructure/event/InMemoryDomainEventBus';
import { QueryBus } from './shared/core/application/query/QueryBus';
import { InMemoryQueryBus } from './shared/infrastructure/query/InMemoryQueryBus';
import { initializeAppModules } from './shared/core/InitializeAppModules';
import { AppModule } from './shared/core/AppModule';
import { TournamentsRegistrationsModule } from './modules/tournaments-registrations/core/TournamentsRegistrationsModule';
import { CurrentTimeProvider } from './shared/core/CurrentTimeProvider';
import { InMemoryTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { TournamentRegistrationsRestApiModule } from './modules/tournaments-registrations/presentation/rest-api-v1/TournamentRegistrationsRestApiModule';

config();

const commandBus: CommandBus = new InMemoryCommandBus();
const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
const queryBus: QueryBus = new InMemoryQueryBus();
const currentTimeProvider: CurrentTimeProvider = () => new Date();

const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
const players = new InMemoryPlayers();
const tournamentRegistrationsModule = TournamentsRegistrationsModule(
  eventBus,
  currentTimeProvider,
  tournamentRegistrationsRepository,
  players,
  players,
);

const appModules: AppModule[] = [tournamentRegistrationsModule];
initializeAppModules(commandBus, eventBus, queryBus, appModules);

startRestApi([TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus)]);
