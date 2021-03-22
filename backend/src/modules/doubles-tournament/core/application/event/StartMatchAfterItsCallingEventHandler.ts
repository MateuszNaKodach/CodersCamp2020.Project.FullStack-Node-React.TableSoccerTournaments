import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {MatchWasCalled} from "../../domain/event/MatchWasCalled";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {StartMatch} from "../../../../match-module/core/application/command/StartMatch";

export class StartMatchAfterItsCallingEventHandler implements EventHandler<MatchWasCalled> {
    constructor(private readonly commandPublisher: CommandPublisher) {}

    async handle(event: MatchWasCalled): Promise<void> {
        await this.commandPublisher.execute(
            new StartMatch({
                //TODO wait with that for update in match module
                matchNumber: event.calledMatch.matchNumber,
                firstMatchSideId: event.calledMatch.team1Id,
                secondMatchSideId: event.calledMatch.team2Id,
            })
        )
    }
}