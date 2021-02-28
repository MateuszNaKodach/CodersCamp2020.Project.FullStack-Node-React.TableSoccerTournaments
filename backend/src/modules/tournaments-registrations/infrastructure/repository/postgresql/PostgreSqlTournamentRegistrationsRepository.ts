import { TournamentRegistrationsRepository } from '../../../core/application/TournamentRegistrationsRepository';
import { TournamentRegistrations } from '../../../core/domain/TournamentRegistrations';
import { TournamentId } from '../../../core/domain/TournamentId';
import { Connection, getConnection, Repository } from 'typeorm';
import { TournamentRegistrationsEntity } from './TournamentRegistrationsEntity';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class PostgreSqlTournamentRegistrationsRepository implements TournamentRegistrationsRepository {
  async findByTournamentId(tournamentId: TournamentId): Promise<TournamentRegistrations | undefined> {
    const findResult = await PostgreSqlTournamentRegistrationsRepository.repository.findOne(tournamentId.raw);
    return findResult ? databaseEntityToDomain(findResult) : undefined;
  }

  async save(registrations: TournamentRegistrations): Promise<void> {
    const entity = new TournamentRegistrationsEntity(
      registrations.tournamentId.raw,
      registrations.status,
      registrations.registeredPlayers.map((playerId) => playerId.raw),
    );
    await PostgreSqlTournamentRegistrationsRepository.repository.save(entity);
  }

  async findAll(): Promise<TournamentRegistrations[]> {
    const findResult = await PostgreSqlTournamentRegistrationsRepository.repository.find();
    return findResult.map((entity) => databaseEntityToDomain(entity));
  }

  private static get repository(): Repository<TournamentRegistrationsEntity> {
    return getConnection().getRepository(TournamentRegistrationsEntity);
  }
}

function databaseEntityToDomain(databaseEntity: TournamentRegistrationsEntity): TournamentRegistrations {
  return new TournamentRegistrations({
    tournamentId: TournamentId.from(databaseEntity.id),
    status: databaseEntity.status,
    registeredPlayers: [...databaseEntity.registeredPlayersIds.map((playerId) => PlayerId.from(playerId))],
  });
}
