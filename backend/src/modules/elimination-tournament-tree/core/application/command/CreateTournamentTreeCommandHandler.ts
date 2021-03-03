import {CreateTournamentTree} from "./CreateTournamentTree";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {EntityIdGenerator} from "../../../../../shared/core/application/EntityIdGenerator";

export class CreateTournamentTreeCommandHandler implements CommandHandler<CreateTournamentTree> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly entityIdGenerator: EntityIdGenerator,
    ) {}

    async execute(command: CreateTournamentTree): Promise<CommandResult> {
        // const tournamentId = command.tournamentId;
        // const doublesTournament = await this.repository.findByTournamentId(tournamentId);
        //
        // const { state, events } = createTournamentTreeWithTeams(doublesTournament, command, this.currentTimeProvider(), this.entityIdGenerator);
        // await this.repository.save(state);
        // this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }
}
