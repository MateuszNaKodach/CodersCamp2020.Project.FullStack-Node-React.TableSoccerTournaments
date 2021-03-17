import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { TournamentTablesWereAssigned } from './event/TournamentTablesWereAssigned';
import { TableNumber } from './TableNumber';
import { TableWasExcludedFromAvailableTables } from './event/TableWasExcludedFromAvailableTables';
import { isDefined } from '../../../../common/Defined';
import { TableWasIncludedInAvailableTables } from './event/TableWasIncludedInAvailableTables';

export class TournamentTable {
  readonly tournamentId: string;
  readonly tableNumber: TableNumber;
  readonly tableName: string;
  readonly availableToPlay: boolean;

  constructor(props: { tournamentId: string; tableNumber: TableNumber; tableName: string; availableToPlay?: boolean }) {
    this.tournamentId = props.tournamentId;
    this.tableNumber = props.tableNumber;
    this.tableName = props.tableName;
    this.availableToPlay = isDefined(props.availableToPlay) ? props.availableToPlay : true;
  }
}

export function assignTablesToTournament(
  state: TournamentTable[] | undefined,
  command: { tournamentId: string; tables: { tableNumber: TableNumber; tableName: string; availableToPlay?: boolean }[] },
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
      availableToPlay: isDefined(table.availableToPlay) ? table.availableToPlay : true,
    });
  });

  const tournamentTablesWereAssigned = new TournamentTablesWereAssigned({
    occurredAt: currentTime,
    tablesAssigned: tournamentTables,
  });

  const assignedTablesToTournament = onTournamentTablesWereAssigned(state, tournamentTablesWereAssigned);

  return {
    state: assignedTablesToTournament,
    events: [tournamentTablesWereAssigned],
  };
}

function isTableNumberDuplicated(tables: { tableNumber: TableNumber; tableName: string }[]) {
  const uniqueValues = new Set(tables.map((table) => table.tableNumber.raw));
  return uniqueValues.size < tables.length;
}

function onTournamentTablesWereAssigned(state: TournamentTable[] | undefined, event: TournamentTablesWereAssigned): TournamentTable[] {
  return event.tablesAssigned.map((table) => new TournamentTable(table));
}

export function excludeFromAvailableTables(
  state: TournamentTable | undefined,
  command: { tournamentId: string; tableNumber: TableNumber },
  currentTime: Date,
): DomainCommandResult<TournamentTable> {
  if (!state) {
    throw new Error(`Table number ${command.tableNumber.raw} is not assigned to the tournament with id=${command.tournamentId}`);
  }
  if (!state.availableToPlay) {
    throw new Error(
      `Table number ${command.tableNumber.raw} in tournament with id=${command.tournamentId} has been already excluded from available tournament tables`,
    );
  }

  const excludedTableFromAvailableTables = onTableAvailabilityWasChanged(state);

  const tableWasExcludedFromAvailableTables = new TableWasExcludedFromAvailableTables({
    occurredAt: currentTime,
    tableExcluded: excludedTableFromAvailableTables,
  });

  return {
    state: excludedTableFromAvailableTables,
    events: [tableWasExcludedFromAvailableTables],
  };
}

function onTableAvailabilityWasChanged(state: TournamentTable): TournamentTable {
  return new TournamentTable({ ...state, availableToPlay: !state.availableToPlay });
}

export function includeInAvailableTables(
  state: TournamentTable | undefined,
  command: { tournamentId: string; tableNumber: TableNumber },
  currentTime: Date,
): DomainCommandResult<TournamentTable> {
  if (!state) {
    throw new Error(`Table number ${command.tableNumber.raw} is not assigned to the tournament with id=${command.tournamentId}`);
  }
  if (state.availableToPlay) {
    throw new Error(
      `Table number ${command.tableNumber.raw} in tournament with id=${command.tournamentId} has been already included in available tournament tables`,
    );
  }

  const includedTableInAvailableTables = onTableAvailabilityWasChanged(state);

  const tableWasIncludedInAvailableTables = new TableWasIncludedInAvailableTables({
    occurredAt: currentTime,
    tableIncluded: includedTableInAvailableTables,
  });

  return {
    state: includedTableInAvailableTables,
    events: [tableWasIncludedInAvailableTables],
  };
}
