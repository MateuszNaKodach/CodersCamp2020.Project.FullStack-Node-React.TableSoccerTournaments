import {QueryHandler} from "../../../../../shared/core/application/query/QueryHandler";
import {FindMatchById, FindMatchByIdResult} from "./FindMatchById";
import {MatchRepository} from "../MatchRepository";
import {MatchId} from "../../domain/MatchId";

export class FindMatchByIdQueryHandler implements QueryHandler<FindMatchById, FindMatchByIdResult> {
    constructor(private readonly repository: MatchRepository) {
    }

    execute(query: FindMatchById): Promise<FindMatchByIdResult> {
        return this.repository.findByMatchId(MatchId.from(query.matchId));
    }
}