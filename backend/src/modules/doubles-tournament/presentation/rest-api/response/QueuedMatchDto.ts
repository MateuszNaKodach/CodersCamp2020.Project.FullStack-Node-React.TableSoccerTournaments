export class QueuedMatchDto {
  readonly matchNumber: number;
  readonly team1Id: string;
  readonly team2Id: string;
  readonly status: 'ENQUEUED' | 'STARTED' | 'ENDED';
  readonly tableNumber: number | undefined;

  constructor(
    matchNumber: number,
    team1Id: string,
    team2Id: string,
    status: 'ENQUEUED' | 'STARTED' | 'ENDED',
    tableNumber: number | undefined,
  ) {
    this.matchNumber = matchNumber;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.status = status;
    this.tableNumber = tableNumber;
  }
}
