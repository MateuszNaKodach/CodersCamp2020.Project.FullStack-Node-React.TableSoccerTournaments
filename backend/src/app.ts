import { config } from 'dotenv';
import { restApiExpressServer } from './shared/infrastructure/rest-api/Server';
import { CommandBus } from './shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from './shared/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from './shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from './shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { QueryBus } from './shared/core/application/query/QueryBus';
import { InMemoryQueryBus } from './shared/infrastructure/core/application/query/InMemoryQueryBus';
import { initializeModuleCores } from './shared/core/InitializeModuleCores';
import { ModuleCore } from './shared/core/ModuleCore';
import { TournamentsRegistrationsModuleCore } from './modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore';
import { CurrentTimeProvider } from './shared/core/CurrentTimeProvider';
import { InMemoryTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository';
import { InMemoryPlayers } from './modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers';
import { TournamentRegistrationsRestApiModule } from './modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule';
import { Module } from './shared/Module';
import { isDefined } from './common/Defined';
import { ModuleRestApi } from './shared/presentation/rest-api/ModuleRestApi';
import { DomainEventBus } from './shared/core/application/event/DomainEventBus';
import { EntityIdGenerator } from './shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from './shared/infrastructure/core/application/UuidEntityIdGenerator';
import { LoggingDomainEventBus } from './shared/infrastructure/core/application/event/LoggingDomainEventBus';
import { MongoTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/mongo/MongoTournamentRegistrationsRepository';
import { Express } from 'express';
import { PlayersMatchingModuleCore } from './modules/players-matching/core/PlayersMatchingModuleCore';
import { connectToMongoDb } from './shared/infrastructure/repository/connectToMongoDb';
import { connectToPostgreSql } from './shared/infrastructure/repository/connectToPostgreSql';
import { PostgreSqlTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/postgresql/PostgreSqlTournamentRegistrationsRepository';
import { PlayerProfilesModuleCore } from './modules/player-profiles/core/PlayerProfilesModuleCore';
import { PlayerProfileRestApiModule } from './modules/player-profiles/presentation/rest-api/PlayerProfileRestApiModule';
import { InMemoryPlayerProfileRepository } from './modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';
import { MongoPlayerProfileRepository } from './modules/player-profiles/infrastructure/repository/mongo/MongoPlayerProfileRepository';
import { InMemoryDoublesTournamentRepository } from './modules/doubles-tournament/core/infrastructure/repository/inmemory/InMemoryDoublesTournamentRepository';
import { DoublesTournamentModuleCore } from './modules/doubles-tournament/core/DoublesTournamentModuleCore';
import { MongoDoublesTournamentRepository } from './modules/doubles-tournament/core/infrastructure/repository/mongo/MongoDoublesTournamentRepository';
import { DoublesTournamentRestApiModule } from './modules/doubles-tournament/core/presentation/rest-api/DoublesTournamentRestApiModule';

config();

export type TableSoccerTournamentsApplication = { restApi: Express };

export async function TableSoccerTournamentsApplication(
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: DomainEventBus = new LoggingDomainEventBus(new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus())),
  queryBus: QueryBus = new InMemoryQueryBus(),
  currentTimeProvider: CurrentTimeProvider = () => new Date(),
  entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator(),
): Promise<TableSoccerTournamentsApplication> {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED') {
    await connectToMongoDb();
  }
  if (process.env.POSTGRES_REPOSITORIES === 'ENABLED') {
    await connectToPostgreSql();
  }

  const tournamentRegistrationsRepository = TournamentRegistrationsRepository();
  const players = new InMemoryPlayers();
  const tournamentsRegistrationsModule: Module = {
    core: TournamentsRegistrationsModuleCore(eventBus, currentTimeProvider, tournamentRegistrationsRepository, players, players),
    restApi: TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus),
  };

  const playersMatchingModule: Module = {
    core: PlayersMatchingModuleCore(eventBus, commandBus, currentTimeProvider),
  };

  const playerProfilesRepository = PlayerProfilesRepository();
  const playerProfilesModule: Module = {
    core: PlayerProfilesModuleCore(eventBus, currentTimeProvider, playerProfilesRepository),
    restApi: PlayerProfileRestApiModule(commandBus, eventBus, queryBus),
  };

  const doublesTournamentRepository = DoublesTournamentRepository();
  const doublesTournamentModule: Module = {
    core: DoublesTournamentModuleCore(eventBus, commandBus, currentTimeProvider, entityIdGenerator, doublesTournamentRepository),
    restApi: DoublesTournamentRestApiModule(commandBus, eventBus, queryBus),
  };

  const modules: Module[] = [
    process.env.TOURNAMENTS_REGISTRATIONS_MODULE === 'ENABLED' ? tournamentsRegistrationsModule : undefined,
    process.env.PLAYERS_MATCHING_MODULE === 'ENABLED' ? playersMatchingModule : undefined,
    process.env.PLAYER_PROFILES_MODULE === 'ENABLED' ? playerProfilesModule : undefined,
    process.env.DOUBLES_TOURNAMENT_MODULE === 'ENABLED' ? doublesTournamentModule : undefined,
  ].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer(modulesRestApis);

  return { restApi };
}

function TournamentRegistrationsRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'MONGO') {
    return new MongoTournamentRegistrationsRepository();
  }
  if (process.env.POSTGRES_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'POSTGRES') {
    return new PostgreSqlTournamentRegistrationsRepository();
  }
  return new InMemoryTournamentRegistrationsRepository();
}

function PlayerProfilesRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'MONGO') {
    return new MongoPlayerProfileRepository();
  }
  return new InMemoryPlayerProfileRepository();
}

function DoublesTournamentRepository() {
  if (process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.DOUBLES_TOURNAMENT_DATABASE === 'MONGO') {
    return new MongoDoublesTournamentRepository();
  }
  return new InMemoryDoublesTournamentRepository();
}
