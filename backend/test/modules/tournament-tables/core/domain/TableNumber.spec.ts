import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';

describe('Table number', function () {
  it('When table number is less than 1, then error should be thrown', async () => {
    const raw = 0;
    expect(() => TableNumber.from(raw)).toThrowError('Table number should be equal at least 1 and at most 200.');
  });
  it('When table number is more than 200, then error should be thrown', async () => {
    const raw = 201;
    expect(() => TableNumber.from(raw)).toThrowError('Table number should be equal at least 1 and at most 200.');
  });
  it('When table number is between 1 and 200, then correct number is return', async () => {
    const raw_min = 1;
    const raw_max = 200;
    expect(TableNumber.from(raw_min)).toBeInstanceOf(TableNumber);
    expect(TableNumber.from(raw_max)).toBeInstanceOf(TableNumber);
  });
});
