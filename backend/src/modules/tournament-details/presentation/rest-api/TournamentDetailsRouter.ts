import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostTournamentDetailsRequestBody } from './request/PostTournamentDetailsRequestBody';
import { AddTournamentDetails } from '../../core/application/command/AddTournamentDetails';
import { FindAllTournamentDetails, FindAllTournamentDetailsResult } from '../../core/application/query/FindAllTournamentDetails';
import { TournamentDetailsListDto } from './response/TournamentDetailsListDto';
import { TournamentDetails } from '../../core/domain/TournamentDetails';
import { TournamentDetailsDto } from './response/TournamentDetailsDto';

export function tournamentDetailsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postAddTournamentDetails = async (request: Request, response: Response) => {
    const requestBody: PostTournamentDetailsRequestBody = request.body;
    const tournamentId = requestBody.tournamentId;
    const tournamentName = requestBody.tournamentName;
    const commandResult = await commandPublisher.execute(new AddTournamentDetails({ tournamentId, tournamentName }));
    return commandResult.process(
      () => response.status(StatusCodes.CREATED).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getAllTournamentDetails = async (request: Request, response: Response) => {
    const queryResult = await queryPublisher.execute<FindAllTournamentDetailsResult>(new FindAllTournamentDetails());
    return response.status(StatusCodes.OK).json(new TournamentDetailsListDto(queryResult.map(toTournamentDetailsDto)));
  };

  const router = express.Router();
  router.post('', postAddTournamentDetails);
  router.get('', getAllTournamentDetails);
  return router;
}

function toTournamentDetailsDto(tournamentDetails: TournamentDetails): TournamentDetailsDto {
  return new TournamentDetailsDto(tournamentDetails.tournamentId, tournamentDetails.tournamentName.raw);
}
