import { Match } from '../../domain/Match';

export class FindMatchById {
  readonly matchId: string;

  constructor(props: { matchId: string }) {
    this.matchId = props.matchId;
  }
}

export type FindMatchByIdResult = Match | undefined;
