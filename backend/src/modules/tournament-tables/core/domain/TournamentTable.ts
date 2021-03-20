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

  const bookReleaseEvents = tournamentTables.map((table) =>
    table.isFree
      ? new TournamentTableWasReleased({
          occurredAt: currentTime,
          tournamentId: table.tournamentId,
          tableNumber: table.tableNumber.raw,
        })
      : new TournamentTableWasBooked({
          occurredAt: currentTime,
          tournamentId: table.tournamentId,
          tableNumber: table.tableNumber.raw,
        }),
  );

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

  const tournamentTableWasBooked = new TournamentTableWasBooked({
    occurredAt: currentTime,
    tournamentId: bookedTable.tournamentId,
    tableNumber: bookedTable.tableNumber.raw,
  });

  return {
    state: bookedTable,
    events: [tournamentTableWasBooked],
  };
}

function onTableAvailabilityWasChanged(state: TournamentTable): TournamentTable {
  return new TournamentTable({ ...state, isFree: !state.isFree });
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

  const tournamentTableWasReleased = new TournamentTableWasReleased({
    occurredAt: currentTime,
    tournamentId: releasedTable.tournamentId,
    tableNumber: releasedTable.tableNumber.raw,
  });

  return {
    state: releasedTable,
    events: [tournamentTableWasReleased],
  };
}
