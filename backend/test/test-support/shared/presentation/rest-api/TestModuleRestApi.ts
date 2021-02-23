import supertest from "supertest";
import express, { Express } from "express";
import { CommandPublisher } from "../../../../../src/shared/core/application/command/CommandBus";
import { DomainEventPublisher } from "../../../../../src/shared/core/application/event/DomainEventBus";
import { QueryPublisher } from "../../../../../src/shared/core/application/query/QueryBus";
import { ModuleRestApi } from "../../../../../src/shared/infrastructure/restapi/ModuleRestApi";
import { CommandPublisherMock } from "../../core/CommandPublisherMock";
import { DomainEventPublisherMock } from "../../core/DomainEventPublisherMock";
import { QueryPublisherMock } from "../../core/QueryPublisherMock";
import { EntityIdGenerator } from "../../../../../src/shared/core/application/EntityIdGenerator";
import { EntityIdGeneratorStub } from "../../core/EntityIdGeneratorStub";

export type ModuleRestApiFactory = (
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
) => ModuleRestApi;

export type TestModuleRestApiConfig = {
  readonly commandPublisher: CommandPublisher;
  readonly queryPublisher: QueryPublisher;
  readonly eventPublisher: DomainEventPublisher;
  readonly entityIdGenerator: EntityIdGenerator;
};

export const restApiTestModuleDefaultConfig: TestModuleRestApiConfig = {
  commandPublisher: CommandPublisherMock(),
  queryPublisher: QueryPublisherMock(),
  eventPublisher: DomainEventPublisherMock(),
  entityIdGenerator: EntityIdGeneratorStub('StubEntityId'),
};

export function testModuleRestApi(
  moduleRestApiFactory: ModuleRestApiFactory,
  config: Partial<TestModuleRestApiConfig> = restApiTestModuleDefaultConfig,
): { agent: supertest.SuperAgentTest } {
  const server = express();

  const restApiModuleConfig = { ...restApiTestModuleDefaultConfig, ...config };
  const restApiModule = moduleRestApiFactory(
    restApiModuleConfig.commandPublisher,
    restApiModuleConfig.eventPublisher,
    restApiModuleConfig.queryPublisher,
    restApiModuleConfig.entityIdGenerator,
  );
  server.use('/rest-api' + restApiModule.path, restApiModule.router);

  return testRestApi(server);
}

export function testRestApi(server: Express): { agent: supertest.SuperAgentTest } {
  const agent = supertest.agent(server);
  return { agent };
}
