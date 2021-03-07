import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {DomainEventPublisher} from "../../../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../../../shared/core/CurrentTimeProvider";
import {MatchRepository} from "../MatchRepository";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import {MatchId} from "../../domain/MatchId";
import {MatchSideId} from "../../domain/MatchSideId";
import {endMatch} from "../../domain/Match";
import {EndMatch} from "./EndMatch";

export class EndMatchCommandHandler implements CommandHandler<EndMatch> {
    constructor(
        private readonly eventPublisher: DomainEventPublisher,
        private readonly currentTimeProvider: CurrentTimeProvider,
        private readonly repository: MatchRepository,
    ) {
    }

    async execute(command: EndMatch): Promise<CommandResult> {
        const matchId = MatchId.from(command.matchId);
        const winner = MatchSideId.from(command.winner);
        const match = await this.repository.findByMatchId(matchId);

        const {state, events} = endMatch(match, {matchId, winner}, this.currentTimeProvider());
        await this.repository.save(state);
        this.eventPublisher.publishAll(events);
        return CommandResult.success();
    }
}