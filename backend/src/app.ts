import { config } from "dotenv";
import { restApiExpressServer } from "./shared/infrastructure/restapi/Server";
import { CommandBus } from "./shared/core/application/command/CommandBus";
import { InMemoryCommandBus } from "./shared/infrastructure/core/application/command/InMemoryCommandBus";
import { StoreAndForwardDomainEventBus } from "./shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus";
import { InMemoryDomainEventBus } from "./shared/infrastructure/core/application/event/InMemoryDomainEventBus";
import { QueryBus } from "./shared/core/application/query/QueryBus";
import { InMemoryQueryBus } from "./shared/infrastructure/core/application/query/InMemoryQueryBus";
import { initializeModuleCores } from "./shared/core/InitializeModuleCores";
import { ModuleCore } from "./shared/core/ModuleCore";
import { TournamentsRegistrationsModuleCore } from "./modules/tournaments-registrations/core/TournamentsRegistrationsModuleCore";
import { CurrentTimeProvider } from "./shared/core/CurrentTimeProvider";
import { InMemoryTournamentRegistrationsRepository } from "./modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryTournamentRegistrationsRepository";
import { InMemoryPlayers } from "./modules/tournaments-registrations/infrastructure/repository/inmemory/InMemoryPlayers";
import { TournamentRegistrationsRestApiModule } from "./modules/tournaments-registrations/presentation/rest-api/TournamentRegistrationsRestApiModule";
import { Module } from "./shared/Module";
import { isDefined } from "./common/Defined";
import { ModuleRestApi } from "./shared/infrastructure/restapi/ModuleRestApi";
import { DomainEventBus } from "./shared/core/application/event/DomainEventBus";
import { EntityIdGenerator } from "./shared/core/application/EntityIdGenerator";
import { UuidEntityIdGenerator } from "./shared/infrastructure/core/application/UuidEntityIdGenerator";

config();

export function TableSoccerTournamentsApplication(
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: DomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
  queryBus: QueryBus = new InMemoryQueryBus(),
  currentTimeProvider: CurrentTimeProvider = () => new Date(),
  entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator(),
) {
  const tournamentRegistrationsRepository = new InMemoryTournamentRegistrationsRepository();
  const players = new InMemoryPlayers();
  const tournamentsRegistrationsModule: Module = {
    core: TournamentsRegistrationsModuleCore(eventBus, currentTimeProvider, tournamentRegistrationsRepository, players, players),
    restApi: TournamentRegistrationsRestApiModule(commandBus, eventBus, queryBus, entityIdGenerator),
  };

  const modules: Module[] = [process.env.FEATURE_TOURNAMENTS_REGISTRATIONS ? tournamentsRegistrationsModule : undefined].filter(isDefined);

  const modulesCores: ModuleCore[] = modules.map((module) => module.core);
  initializeModuleCores(commandBus, eventBus, queryBus, modulesCores);

  const modulesRestApis: ModuleRestApi[] = modules.map((module) => module.restApi).filter(isDefined);
  const restApi = restApiExpressServer(modulesRestApis);
  return { restApi };
}
