import { DoublesTournament } from '../../domain/DoublesTournament';

export class FindDoublesTournamentById {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export type FindDoublesTournamentByIdResult = DoublesTournament | undefined;
