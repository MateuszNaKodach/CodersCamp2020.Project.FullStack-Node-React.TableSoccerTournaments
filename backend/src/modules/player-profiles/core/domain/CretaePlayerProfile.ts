import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";
import {PlayerProfileWasCreated} from "./event/PlayerProfileWasCreated";

export function createPlayerProfile(
    command: {
        playerId: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
    },
    currentTime: Date,
): { events: DomainEvent[] } {
    return {
        events: [new PlayerProfileWasCreated(
            {
                occurredAt: currentTime,
                playerId: command.playerId,
                firstName: command.firstName,
                lastName: command.lastName,
                emailAddress: command.emailAddress,
                phoneNumber: command.phoneNumber
            }
        )]
    }
}