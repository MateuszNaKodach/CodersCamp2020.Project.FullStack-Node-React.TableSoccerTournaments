import {NumberIdGeneratorStub} from "../../../../test-support/shared/core/NumberIdGeneratorStub";
import {CreateTournamentTree} from "../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree";
import {CommandResult} from "../../../../../src/shared/core/application/command/CommandResult";
import Failure = CommandResult.Failure;
import {testTournamentTreeModule} from "./TestTournamentTreeModule";
import {TournamentTreeWasCreated} from "../../../../../src/modules/tournament-tree/core/domain/event/TournamentTreeWasCreated";

describe('Tournament Tree | Write Side', () => {
    //TODO:
    it('given tournament Teams, when create tournament tree, then tournament tree was created', async () => {

        //Given
        const currentTime = new Date();
        const entityIdGen = NumberIdGeneratorStub(100, "entityId");
        const teamEntityIdGen = NumberIdGeneratorStub(100, "teamId");
        const playerEntityIdGen = NumberIdGeneratorStub(100, "playerId");
        const testTournamentTree = testTournamentTreeModule(currentTime, entityIdGen);
        const tournamentId = 'tournamentId';

        const tournamentTeams = Array.from(Array(10).keys()).map(() => ({
            teamId: teamEntityIdGen.generate(),
            firstTeamPlayer: playerEntityIdGen.generate(),
            secondTeamPlayer: playerEntityIdGen.generate()
        }))

        const createTournamentTree = new CreateTournamentTree(
            {
                tournamentId: tournamentId,
                tournamentTeams: tournamentTeams
            }
        );

        const commandResult = await testTournamentTree.executeCommand(createTournamentTree);

        //Then
        expect(commandResult.isSuccess()).toBeTruthy();
        expect(testTournamentTree.lastPublishedEvent()).toStrictEqual(
            new TournamentTreeWasCreated(tournamentId, currentTime),
        );
    });

    it('given only one tournament team, when create tournament tree, then tournament tree was failed', async () => {

        //Given
        const currentTime = new Date();
        const entityIdGen = NumberIdGeneratorStub(100, "entityId");
        const teamEntityIdGen = NumberIdGeneratorStub(100, "teamId");
        const playerEntityIdGen = NumberIdGeneratorStub(100, "playerId");
        const testTournamentTree = testTournamentTreeModule(currentTime, entityIdGen);
        const tournamentId = 'tournamentId';

        const tournamentTeams = Array.from(Array(1).keys()).map(() => ({
            teamId: teamEntityIdGen.generate(),
            firstTeamPlayer: playerEntityIdGen.generate(),
            secondTeamPlayer: playerEntityIdGen.generate()
        }))
        const createTournamentTree = new CreateTournamentTree(
            {
                tournamentId: tournamentId,
                tournamentTeams: tournamentTeams
            }
        );
        const commandResult = await testTournamentTree.executeCommand(createTournamentTree);

        //Then
        expect(commandResult.isSuccess()).toBeFalsy();
        expect(testTournamentTree.lastPublishedEvent()).toStrictEqual(undefined);
        expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 2 fighting teams.'));
    });
});

