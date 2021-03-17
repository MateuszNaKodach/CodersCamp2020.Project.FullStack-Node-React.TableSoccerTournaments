import { CreateTournamentTree } from './CreateTournamentTree';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { EntityIdGenerator } from '../../../../../shared/core/application/EntityIdGenerator';
import { TournamentTeam } from '../../domain/TournamentTeam';
import { TournamentTeamId } from '../../domain/TournamentTeamId';
import { createTournamentTree } from '../../domain/TournamentTree';
import { TournamentTreeRepository } from '../TournamentTreeRepository';

export class CreateTournamentTreeCommandHandler implements CommandHandler<CreateTournamentTree> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly entityIdGenerator: EntityIdGenerator,
    private readonly repository: TournamentTreeRepository,
  ) {}

  async execute(command: CreateTournamentTree): Promise<CommandResult> {
    const tournamentId = command.tournamentId;
    const tournamentTeams = command.tournamentTeams.map((team) => {
      return new TournamentTeam({ teamId: TournamentTeamId.from(team.teamId) });
    });

    const commandForCreateTournamentTree = { tournamentId: tournamentId, tournamentTeams: tournamentTeams };
    const tournamentTree = await this.repository.findByTournamentTreeId(tournamentId);
    const { state, events } = createTournamentTree(
      tournamentTree,
      commandForCreateTournamentTree,
      this.currentTimeProvider,
      this.entityIdGenerator,
    );

    await this.repository.save(state);

    this.eventPublisher.publishAll(events);

    return CommandResult.success();
  }
}
