import {EventHandler} from "../../../../../shared/core/application/event/EventHandler";
import {CommandPublisher} from "../../../../../shared/core/application/command/CommandBus";
import {PlayerProfileWasCreated} from "../../domain/event/PlayerProfileWasCreated";
import {SendEmailAfterProfileCreation} from "../../../../email-sending/core/application/command/SendEmailAfterProfileCreation";

export class PlayerProfileWasCreatedEventHandler implements EventHandler<PlayerProfileWasCreated> {
    constructor(private readonly commandPublisher: CommandPublisher) {
    }

    async handle(event: PlayerProfileWasCreated): Promise<void> {
        await this.commandPublisher.execute(new SendEmailAfterProfileCreation(
            {
                firstName: event.firstName,
                lastName: event.lastName,
                emailAddress: event.emailAddress
            })
        );
    }
}