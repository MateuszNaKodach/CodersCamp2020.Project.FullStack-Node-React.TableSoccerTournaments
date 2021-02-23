import { HasConstructor } from "../../../../../common/HasConstructor";
import { Query } from "../../../../core/application/query/Query";
import { QueryHandler } from "../../../../core/application/query/QueryHandler";
import { QueryBus } from "../../../../core/application/query/QueryBus";

export class InMemoryQueryBus implements QueryBus {
  private handlers = new Map<QueryTypeName, QueryHandler>();

  async execute<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType> {
    const queryTypeName: QueryTypeName = Object.getPrototypeOf(query).constructor.name;
    const queryHandler = this.handlers.get(queryTypeName);
    if (!queryHandler) {
      return Promise.reject(new QueryHandlerNotFoundException(queryTypeName));
    }
    const queryResult = await queryHandler.execute(query);
    return queryResult as ResultType;
  }

  registerHandler<ResultType = any, QueryType extends Query = Query>(
    queryType: HasConstructor<QueryType>,
    handler: QueryHandler<QueryType, ResultType>,
  ) {
    const queryTypeName: QueryTypeName = queryType.name;
    const queryHandler = this.handlers.get(queryTypeName);
    if (queryHandler) {
      throw new QueryHandlerAlreadyRegisteredException(queryTypeName);
    }
    this.handlers.set(queryTypeName, handler);
  }

  withHandler<ResultType = any, QueryType extends Query = Query>(
    queryType: HasConstructor<QueryType>,
    handler: QueryHandler<QueryType, ResultType>,
  ): QueryBus {
    this.registerHandler<ResultType, QueryType>(queryType, handler);
    return this;
  }
}

export class QueryHandlerNotFoundException extends Error {
  constructor(queryName: string) {
    super(`The query handler for the "${queryName}" query was not found!`);
  }
}

class QueryHandlerAlreadyRegisteredException extends Error {
  constructor(queryName: string) {
    super(`The query handler for the "${queryName}" query was already registered!`);
  }
}

type QueryTypeName = string;
