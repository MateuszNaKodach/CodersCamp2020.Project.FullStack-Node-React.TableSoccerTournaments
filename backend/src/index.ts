import { config } from 'dotenv';
import { startRestApi } from './shared/infrastructure/restapi/Server';
import { CommandBus } from './shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from './shared/infrastructure/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from './shared/infrastructure/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from './shared/infrastructure/event/InMemoryDomainEventBus';
import { QueryBus } from './shared/core/application/query/QueryBus';
import { InMemoryQueryBus } from './shared/infrastructure/query/InMemoryQueryBus';
import { initializeModuleCores } from './shared/core/InitializeModuleCores';
import { ModuleCore } from './shared/core/ModuleCore';
import { TournamentsRegistrationsModuleCore } from './modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore';
import { CurrentTimeProvider } from './shared/core/CurrentTimeProvider';
import { InMemoryTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { TournamentRegistrationsRestApiModule } from './modules/tournaments-registrations/presentation/rest-api-v1/TournamentRegistrationsRestApiModule';
import { Module } from './shared/Module';
import { isDefined } from './common/Defined';
import { ModuleRestApi } from './shared/infrastructure/restapi/ModuleRestApi';

config();

const commandBus: CommandBus = new InMemoryCommandBus();
const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
const queryBus: QueryBus = new InMemoryQueryBus();
const currentTimeProvider: CurrentTimeProvider = () => new Date();

const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
const players = new InMemoryPlayers();
const tournamentsRegistrationsModule: Module = {
  core: TournamentsRegistrationsModuleCore(eventBus, currentTimeProvider, tournamentRegistrationsRepository, players, players),
  restApi: TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus),
};

const modules: Module[] = [process.env.FEATURE_TOURNAMENTS_REGISTRATIONS ? tournamentsRegistrationsModule : undefined].filter(isDefined);

const modulesCores: ModuleCore[] = modules.map((module) => module.core);
initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
startRestApi(modulesRestApis);
