import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {CreatePlayerProfile} from "./CreatePlayerProfile";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {createPlayerProfile} from "../../domain/PlayerProfile";
import {PlayerProfilesRepository} from "../PlayerProfilesRepository";

export class CreatePlayerProfileCommandHandler implements CommandHandler<CreatePlayerProfile> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly repository: PlayerProfilesRepository) {}

    async execute(command: CreatePlayerProfile): Promise<CommandResult> {
        const playerId = command.playerId;
        const playerProfile = await this.repository.findByPlayerId(playerId);

        const { state, events } = createPlayerProfile(playerProfile, command, this.currentTimeProvider);

        await this.repository.save(state);
        this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }

}