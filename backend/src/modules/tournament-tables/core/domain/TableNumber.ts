export class TableNumber {
  private readonly TYPE = 'TableNumber';

  private constructor(readonly raw: number) {}

  static from(tableNumber: number): TableNumber {
    if (tableNumber <= 0 || tableNumber > 200) {
      throw new Error('Table number should be equal at least 1 and at most 200.');
    }
    return new TableNumber(tableNumber);
  }
}
