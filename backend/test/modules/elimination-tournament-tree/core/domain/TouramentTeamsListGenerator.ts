import {TournamentTeam} from "../../../../../src/modules/tournament-tree/core/domain/TournamentTeam";
import {TournamentTeamId} from "../../../../../src/modules/tournament-tree/core/domain/TournamentTeamId";
import {EntityIdGenerator} from "../../../../../src/shared/core/application/EntityIdGenerator";

export function generateTournamentTeamsList(entityIdGen: EntityIdGenerator, numberOfTeams = 1): TournamentTeam[] {
    return Array.from(Array(numberOfTeams))
        .map(() => new TournamentTeam({teamId: TournamentTeamId.from(entityIdGen.generate())}));
}
