export class QueuedTable {
  readonly tableNumber: number;
  readonly isFree: boolean;

  constructor(props: { tableNumber: number; isFree: boolean }) {
    this.tableNumber = props.tableNumber;
    this.isFree = props.isFree;
  }
}
