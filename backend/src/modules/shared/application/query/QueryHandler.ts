import { Query } from './Query';

export interface QueryHandler<QueryType extends Query = any, QueryResponseType = any> {
  execute(query: QueryType): Promise<QueryResponseType>;
}
