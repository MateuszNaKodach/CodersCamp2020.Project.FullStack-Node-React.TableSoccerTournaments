import express, { Request, Response } from 'express';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { FindAllPlayerProfiles, FindAllPlayerProfilesResult } from '../../core/application/query/FindAllPlayerProfiles';
import { StatusCodes } from 'http-status-codes';
import { PlayerProfilesListDto } from './response/PlayerProfilesListDto';
import { PlayerProfileDto } from './response/PlayerProfileDto';
import { PlayerProfile } from '../../core/domain/PlayerProfile';
import { PostPlayerProfileRequestBody } from './request/PostPlayerProfileRequestBody';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { CreatePlayerProfile } from '../../core/application/command/CreatePlayerProfile';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { FindPlayerProfileById, FindPlayerProfileByIdResult } from '../../core/application/query/FindPlayerProfileById';

export function playerProfileRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getAllPlayersProfiles = async (request: Request, response: Response) => {
    const queryResult = await queryPublisher.execute<FindAllPlayerProfilesResult>(new FindAllPlayerProfiles());
    return response.status(StatusCodes.OK).json(new PlayerProfilesListDto(queryResult.map(toPlayerProfileDto)));
  };

  const createPlayerProfile = async (request: Request, response: Response) => {
    const requestBody: PostPlayerProfileRequestBody = request.body;
    const commandResult = await commandPublisher.execute(new CreatePlayerProfile(requestBody));
    return commandResult.process(
      () => response.status(StatusCodes.CREATED).json(requestBody).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getPlayerProfileById = async (request: Request, response: Response) => {
    const { playerId } = request.params;
    const queryResult = await queryPublisher.execute<FindPlayerProfileByIdResult>(new FindPlayerProfileById({ playerId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Player profile with id = ${playerId} not found!` });
    }
    return response.status(StatusCodes.OK).json(toPlayerProfileDto(queryResult));
  };

  const router = express.Router();
  router.post('', createPlayerProfile);
  router.get('', getAllPlayersProfiles);
  router.get('/:playerId', getPlayerProfileById);
  return router;
}

function toPlayerProfileDto(playerProfile: PlayerProfile): PlayerProfileDto {
  return new PlayerProfileDto(
    playerProfile.playerId.raw,
    playerProfile.firstName,
    playerProfile.lastName,
    playerProfile.phoneNumber,
    playerProfile.emailAddress,
  );
}
