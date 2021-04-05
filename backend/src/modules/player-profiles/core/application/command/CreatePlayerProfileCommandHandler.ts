import { CommandHandler } from '../../../../../shared/core/application/command/CommandHandler';
import { CreatePlayerProfile } from './CreatePlayerProfile';
import { CommandResult } from '../../../../../shared/core/application/command/CommandResult';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { createPlayerProfile } from '../../domain/PlayerProfile';
import { PlayerProfilesRepository } from '../PlayerProfilesRepository';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class CreatePlayerProfileCommandHandler implements CommandHandler<CreatePlayerProfile> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly repository: PlayerProfilesRepository,
  ) {}

  async execute(command: CreatePlayerProfile): Promise<CommandResult> {
    const playerId = PlayerId.from(command.playerId);
    const playerProfile = await this.repository.findByPlayerId(playerId);
    const newCommand = {
      playerId: playerId,
      firstName: command.firstName,
      lastName: command.lastName,
      emailAddress: command.emailAddress,
      phoneNumber: command.phoneNumber,
    };

    const allPlayers = await this.repository.findAll();
    if (allPlayers.some((player) => player.emailAddress === command.emailAddress)) {
      return CommandResult.failureDueTo(new Error('Such e-mail already exists!'));
    }

    const { state, events } = createPlayerProfile(playerProfile, newCommand, this.currentTimeProvider);

    await this.repository.save(state);
    this.eventPublisher.publishAll(events);
    return CommandResult.success();
  }
}
