import {Query} from "./Query";
import {HasConstructor} from "../../../../common/HasConstructor";
import {QueryHandler} from "./QueryHandler";

export interface QueryBus {
  execute<ResultType = any, QueryType extends Query = Query>(query: QueryType): Promise<ResultType>;

  registerHandler<ResultType = any, QueryType extends Query = Query, >(
      queryType: HasConstructor<QueryType>,
      handler: QueryHandler<QueryType, ResultType>
  ): void;
}
