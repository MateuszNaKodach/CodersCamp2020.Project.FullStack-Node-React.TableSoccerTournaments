import {HasConstructor} from "../../../../common/hasConstructor";
import {Query} from "../../application/query/Query";
import {QueryHandler} from "../../application/query/QueryHandler";
import {QueryBus} from "../../application/query/QueryBus";

export class InMemoryQueryBus implements QueryBus {
  private handlers = new Map<QueryTypeName, QueryHandler>();

  async execute<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType> {
    const queryTypeName: QueryTypeName = Object.getPrototypeOf(query).constructor.name;
    const queryHandler = this.handlers.get(queryTypeName);
    if (!queryHandler) {
      throw new QueryHandlerNotFoundException(queryTypeName)
    }
    const queryResult = await queryHandler.execute(query)
    return queryResult as ResultType
  }

  registerHandler<ResultType = any, QueryType extends Query = Query>(
      queryType: HasConstructor<QueryType>,
      handler: QueryHandler<QueryType, ResultType>
  ) {
    const queryTypeName: QueryTypeName = queryType.name;
    const commandHandler = this.handlers.get(queryTypeName);
    if (commandHandler) {
      throw new Error('Command handler already registered!')
    }
    this.handlers.set(queryTypeName, handler)
  }

}

export class QueryHandlerNotFoundException extends Error {
  constructor(queryName: string) {
    super(`The query handler for the "${queryName}" query was not found!`,);
  }
}

type QueryTypeName = string;
