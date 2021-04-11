export class QueuedMatchDto {
  readonly matchNumber: number;
  readonly team1Id: string;
  readonly team2Id: string;
  readonly status: 'enqueued' | 'started' | 'ended';
  readonly tableNumber: number | undefined;

  constructor(
    matchNumber: number,
    team1Id: string,
    team2Id: string,
    status: 'enqueued' | 'started' | 'ended',
    tableNumber: number | undefined,
  ) {
    this.matchNumber = matchNumber;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.status = status;
    this.tableNumber = tableNumber;
  }
}
