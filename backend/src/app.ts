import { config } from 'dotenv';
import { restApiExpressServer } from './shared/infrastructure/restapi/Server';
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
import { ModuleRestApi } from './shared/infrastructure/restapi/ModuleRestApi';
import { DomainEventBus } from './shared/core/application/event/DomainEventBus';
import { EntityIdGenerator } from './shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from './shared/infrastructure/core/application/UuidEntityIdGenerator';
import { PlayerProfileWasCreated } from './modules/player-profiles/core/domain/event/PlayerProfileWasCreated';
import { LoggingDomainEventBus } from './shared/infrastructure/core/application/event/LoggingDomainEventBus';
import { MongoTournamentRegistrationsRepository } from './modules/tournaments-registrations/infrastructure/repository/mongo/MongoTournamentRegistrationsRepository';
import mongoose from 'mongoose';
import { Express } from 'express';

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
    const connectionString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    await mongoose
      .connect(connectionString, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        dbName: process.env.MONGO_DB,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log(`[TableSoccerTournamentsApplication]: Application connected to mongoDB instance at: ${connectionString}`))
      .catch((error) =>
        console.error(`[TableSoccerTournamentsApplication]: Error while connecting to mongo db at: ${connectionString}`, error),
      );
  }

  const tournamentRegistrationsRepository =
    process.env.MONGO_REPOSITORIES === 'ENABLED' && process.env.TOURNAMENTS_REGISTRATIONS_DATABASE === 'MONGO'
      ? new MongoTournamentRegistrationsRepository()
      : new InMemoryTournamentRegistrationsRepository();
  const players = new InMemoryPlayers();
  const tournamentsRegistrationsModule: Module = {
    core: TournamentsRegistrationsModuleCore(eventBus, currentTimeProvider, tournamentRegistrationsRepository, players, players),
    restApi: TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus, entityIdGenerator),
  };

  const modules: Module[] = [
    process.env.TOURNAMENTS_REGISTRATIONS_MODULE === 'ENABLED' ? tournamentsRegistrationsModule : undefined,
  ].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer(modulesRestApis);

  initializeDummyData(eventBus, entityIdGenerator);

  return { restApi };
}

//TODO: Remove for production usage
function initializeDummyData(eventBus: DomainEventBus, entityIdGenerator: EntityIdGenerator) {
  const janKowalski = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Jan',
    emailAddress: 'jan.kowalski@test.pl',
    lastName: 'Kowalski',
    phoneNumber: '123321333',
  };
  const katarzynaNowak = {
    playerId: entityIdGenerator.generate(),
    firstName: 'Katarzyna',
    emailAddress: 'kasia12@test.pl',
    lastName: 'Nowak',
    phoneNumber: '143351333',
  };
  eventBus.publish(new PlayerProfileWasCreated({ occurredAt: new Date(), ...janKowalski }));
  eventBus.publish(new PlayerProfileWasCreated({ occurredAt: new Date(), ...katarzynaNowak }));
}
