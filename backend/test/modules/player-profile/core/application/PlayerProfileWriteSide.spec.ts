import {testPlayerProfileModule} from "./TestPlayerProfileModule";
import {CreatePlayerProfile} from "../../../../../src/modules/player-profiles/core/application/command/CreatePlayerProfile";
import {PlayerProfileWasCreated} from "../../../../../src/modules/player-profiles/core/domain/event/PlayerProfileWasCreated";

describe('Player profile | Write Side', () => {
    it('given new (no records in data base) player profile data, when create player profile, then new player profile was created', async () => {
        //Given
        const currentTime = new Date();
        const createPlayerProfile = testPlayerProfileModule(currentTime);
        const playerId = 'PlayerId';
        const firstName = 'Johnny';
        const lastName = 'Bravo';
        const emailAddress = 'bravo@gmail.com';
        const phoneNumber = '123456789';

        //When
        const createPlayerProfileCommand = new CreatePlayerProfile({
            playerId,
            firstName,
            lastName,
            emailAddress,
            phoneNumber
        });
        const commandResult = await createPlayerProfile.executeCommand(createPlayerProfileCommand);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();

        expect(createPlayerProfile.lastPublishedEvent()).toStrictEqual(
            new PlayerProfileWasCreated({
                occurredAt: currentTime,
                playerId,
                firstName,
                lastName,
                emailAddress,
                phoneNumber
            })
        )
    })
});