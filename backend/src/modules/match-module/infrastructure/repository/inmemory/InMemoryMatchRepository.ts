import { MatchRepository } from '../../../core/application/MatchRepository';
import { Match } from '../../../core/domain/Match';
import { MatchId } from '../../../core/domain/MatchId';

export class InMemoryMatchRepository implements MatchRepository {
  private readonly entities: { [id: string]: Match } = {};

  async save(match: Match): Promise<void> {
    this.entities[match.matchId.raw] = match;
  }

  findAll(): Promise<Match[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }

  findByMatchId(matchId: MatchId): Promise<Match> {
    return Promise.resolve(this.entities[matchId.raw]);
  }
}
