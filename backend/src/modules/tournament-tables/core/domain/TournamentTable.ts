import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { TournamentTablesWereAssigned } from './event/TournamentTablesWereAssigned';
import { TableNumber } from './TableNumber';
import { TournamentTableWasBooked } from './event/TournamentTableWasBooked';
import { isDefined } from '../../../../common/Defined';
import { TournamentTableWasReleased } from './event/TournamentTableWasReleased';

export class TournamentTable {
  readonly tournamentId: string;
  readonly tableNumber: TableNumber;
  readonly tableName: string;
  readonly isFree: boolean;

  constructor(props: { tournamentId: string; tableNumber: TableNumber; tableName: string; isFree?: boolean }) {
    this.tournamentId = props.tournamentId;
    this.tableNumber = props.tableNumber;
    this.tableName = props.tableName;
    this.isFree = isDefined(props.isFree) ? props.isFree : true;
  }
}

export function assignTablesToTournament(
  state: TournamentTable[] | undefined,
  command: { tournamentId: string; tables: { tableNumber: TableNumber; tableName: string; isFree?: boolean }[] },
  currentTime: Date,
): DomainCommandResult<TournamentTable[]> {
  if (state !== undefined && state.length > 0) {
    throw new Error('Some tables are already assigned to that tournament.');
  }
  if (command.tables.length === 0) {
    throw new Error('Tournament must have at least 1 table assigned.');
  }
  if (isTableNumberDuplicated(command.tables)) {
    throw new Error('Tables numbers must be different.');
  }

  const tournamentTables: TournamentTable[] = command.tables.map((table) => {
    return new TournamentTable({
      tournamentId: command.tournamentId,
      tableNumber: table.tableNumber,
      tableName: table.tableName,
      isFree: isDefined(table.isFree) ? table.isFree : true,
    });
  });

  const bookReleaseEvents = tournamentTables.map((table) => {
    return table.isFree
      ? tournamentTableWasReleased(currentTime, table.tournamentId, table.tableNumber.raw)
      : tournamentTableWasBooked(currentTime, table.tournamentId, table.tableNumber.raw);
  });

  const tournamentTablesWereAssigned = new TournamentTablesWereAssigned({
    occurredAt: currentTime,
    tablesAssigned: tournamentTables,
  });

  const assignedTablesToTournament = onTournamentTablesWereAssigned(state, tournamentTablesWereAssigned);

  return {
    state: assignedTablesToTournament,
    events: [...bookReleaseEvents, tournamentTablesWereAssigned],
  };
}

function isTableNumberDuplicated(tables: { tableNumber: TableNumber; tableName: string }[]) {
  const uniqueValues = new Set(tables.map((table) => table.tableNumber.raw));
  return uniqueValues.size < tables.length;
}

function onTournamentTablesWereAssigned(state: TournamentTable[] | undefined, event: TournamentTablesWereAssigned): TournamentTable[] {
  return event.tablesAssigned.map((table) => new TournamentTable(table));
}

export function bookTournamentTable(
  state: TournamentTable | undefined,
  command: { tournamentId: string; tableNumber: TableNumber },
  currentTime: Date,
): DomainCommandResult<TournamentTable> {
  if (!state) {
    throw new Error(`Table number ${command.tableNumber.raw} is not assigned to the tournament with id=${command.tournamentId}`);
  }
  if (!state.isFree) {
    throw new Error(`Table number ${command.tableNumber.raw} in tournament with id=${command.tournamentId} has been already booked`);
  }

  const bookedTable = onTableAvailabilityWasChanged(state);

  const tournamentTableWasBookedEvent = tournamentTableWasBooked(currentTime, bookedTable.tournamentId, bookedTable.tableNumber.raw);

  return {
    state: bookedTable,
    events: [tournamentTableWasBookedEvent],
  };
}

function onTableAvailabilityWasChanged(state: TournamentTable): TournamentTable {
  return new TournamentTable({ ...state, isFree: !state.isFree });
}

function tournamentTableWasBooked(occurredAt: Date, tournamentId: string, tableNumber: number): TournamentTableWasBooked {
  return new TournamentTableWasBooked({ occurredAt, tournamentId, tableNumber });
}

export function releaseTournamentTable(
  state: TournamentTable | undefined,
  command: { tournamentId: string; tableNumber: TableNumber },
  currentTime: Date,
): DomainCommandResult<TournamentTable> {
  if (!state) {
    throw new Error(`Table number ${command.tableNumber.raw} is not assigned to the tournament with id=${command.tournamentId}`);
  }
  if (state.isFree) {
    throw new Error(`Table number ${command.tableNumber.raw} in tournament with id=${command.tournamentId} is already free`);
  }

  const releasedTable = onTableAvailabilityWasChanged(state);

  const tournamentTableWasReleasedEvent = tournamentTableWasReleased(
    currentTime,
    releasedTable.tournamentId,
    releasedTable.tableNumber.raw,
  );

  return {
    state: releasedTable,
    events: [tournamentTableWasReleasedEvent],
  };
}

function tournamentTableWasReleased(occurredAt: Date, tournamentId: string, tableNumber: number): TournamentTableWasReleased {
  return new TournamentTableWasReleased({ occurredAt, tournamentId, tableNumber });
}
