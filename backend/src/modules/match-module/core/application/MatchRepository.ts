import { Match } from '../domain/Match';
import { MatchId } from '../domain/MatchId';

export interface MatchRepository {
  save(match: Match): Promise<void>;

  findByMatchId(matchId: MatchId): Promise<Match | undefined>;

  findAll(): Promise<Match[]>;
}
