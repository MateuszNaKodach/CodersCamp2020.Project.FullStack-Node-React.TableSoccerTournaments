import {CommandPublisher} from "../../../../shared/core/application/command/CommandBus";
import {DomainEventPublisher} from "../../../../shared/core/application/event/DomainEventBus";
import {QueryPublisher} from "../../../../shared/core/application/query/QueryBus";
import express, {Request, Response} from "express";
import {
    FindTournamentTreeByTournamentId,
    FindTournamentTreeByTournamentIdResult
} from "../../core/application/query/FindTournamentTreeByTournamentId";
import {StatusCodes} from "http-status-codes";
import {TournamentTeamListDto} from "../../../doubles-tournament/presentation/rest-api/response/TournamentTeamListDto";

export function tournamentTreeRouter(
    commandPublisher: CommandPublisher,
    eventPublisher: DomainEventPublisher,
    queryPublisher: QueryPublisher,
): express.Router {
const getTournamentTreeById = async (request: Request, response: Response)=>{
    const {tournamentId} = request.params;
    const queryResult = await queryPublisher.execute<FindTournamentTreeByTournamentIdResult>(new FindTournamentTreeByTournamentId({ tournamentId: tournamentId }))
    if (!queryResult) {
    return response.status(StatusCodes.NOT_FOUND).json({message: `Tournament tree in tournament with id = ${tournamentId} not found, because tournament with such id doesn't exist!` });
    }
    return response.status(StatusCodes.OK).json());


}



    const router = express.Router();
    // router.get('/:tournamentId/teams', getTournamentTeamsByTournamentId);
    return router;
}

// function toTournamentTree