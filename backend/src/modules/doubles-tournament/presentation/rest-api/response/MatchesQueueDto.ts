import { QueuedMatchDto } from './QueuedMatchDto';

export class MatchesQueueDto {
  readonly tournamentId;
  readonly queue: QueuedMatchDto[];

  constructor(tournamentId: string, queue: QueuedMatchDto[]) {
    this.tournamentId = tournamentId;
    this.queue = queue;
  }
}
