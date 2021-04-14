import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RegistrationsStatus } from '../../../core/domain/RegistrationsStatus';

@Entity('tournament_registrations')
export class TournamentRegistrationsEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('number')
  readonly version: number;

  @Column({
    type: 'enum',
    enum: RegistrationsStatus,
    nullable: false,
  })
  readonly status: RegistrationsStatus;

  @Column('text', { array: true })
  readonly registeredPlayersIds: string[];

  constructor(id: string, version: number, status: RegistrationsStatus, registeredPlayersIds: string[]) {
    this.id = id;
    this.version = version;
    this.status = status;
    this.registeredPlayersIds = registeredPlayersIds;
  }
}
