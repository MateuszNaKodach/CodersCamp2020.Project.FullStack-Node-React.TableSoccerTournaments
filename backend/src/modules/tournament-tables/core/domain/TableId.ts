export class TableId {
  private readonly TYPE = 'TableId';

  private constructor(readonly raw: string) {}

  static from(tableId: string): TableId {
    if (tableId.length <= 0) {
      throw new Error('TableId cannot be empty!');
    }
    return new TableId(tableId);
  }
}
