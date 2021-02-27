import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { registerTournamentPlayer } from '../../domain/TournamentRegistrations';
import { TournamentId } from '../../domain/TournamentId';
import { TournamentRegistrationsRepository } from '../TournamentRegistrationsRepository';
import { RegisterPlayerForTournament } from './RegisterPlayerForTournament';
import { AvailablePlayersForTournament } from './AvailablePlayersForTournament';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';

export class RegisterPlayerForTournamentCommandHandler implements CommandHandler<RegisterPlayerForTournament> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: TournamentRegistrationsRepository,
    private readonly availablePlayersForTournament: AvailablePlayersForTournament, //Teraz implementacja np. sprawdza czy w ogóle istnieje taki gracz, ale np. może weryfikować, że turniej jest tylko dla osób płacących składkę.
  ) {}

  async execute(command: RegisterPlayerForTournament): Promise<CommandResult> {
    const tournamentId = TournamentId.from(command.tournamentId);
    const playerId = PlayerId.from(command.playerId);
    const tournamentRegistrations = await this.repository.findByTournamentId(tournamentId);

    const canPlayerTakiePartInTheTournament = await this.availablePlayersForTournament.canPlay(playerId);
    const { state, events } = registerTournamentPlayer(
      tournamentRegistrations,
      { playerId },
      this.currentTimeProvider,
      canPlayerTakiePartInTheTournament,
    );

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
