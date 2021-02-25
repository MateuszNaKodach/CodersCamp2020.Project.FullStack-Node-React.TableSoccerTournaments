import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {PlayerProfile} from "./PlayerProfile";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {createPlayerProfile} from "../../domain/CretaePlayerProfile";
import {PlayerProfilesRepository} from "../PlayerProfilesRepository";

export class PlayerProfileCommandHandler implements CommandHandler<PlayerProfile> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly repository: PlayerProfilesRepository) {}

    async execute(command: PlayerProfile): Promise<CommandResult> {
        const { events } = createPlayerProfile(command, this.currentTimeProvider());
        this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }

}