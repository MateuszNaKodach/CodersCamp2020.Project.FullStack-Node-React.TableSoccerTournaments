export class TableNumber {
  private readonly TYPE = 'TableNumber';

  private constructor(readonly raw: number) {}

  static from(tableNumber: number): TableNumber {
    if (!Number.isInteger(tableNumber)) {
      throw new Error('Table number should be an integer.');
    }
    if (tableNumber <= 0 || tableNumber > 200) {
      throw new Error('Table number should be equal at least 1 and at most 200.');
    }
    return new TableNumber(tableNumber);
  }
}
