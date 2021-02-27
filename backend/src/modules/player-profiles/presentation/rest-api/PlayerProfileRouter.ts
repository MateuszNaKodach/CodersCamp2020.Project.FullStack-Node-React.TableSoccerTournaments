import express, { Request, Response } from 'express';
import {QueryPublisher} from "../../../../shared/core/application/query/QueryBus";
import {FindAllPlayerProfiles, FindAllPlayerProfilesResult} from "../../core/application/query/FindAllPlayerProfiles";
import {StatusCodes} from "http-status-codes";
import {PlayerProfilesListDto} from "./response/PlayerProfilesListDto";
import {PlayerProfileDto} from "./response/PlayerProfileDto";
import {PlayerProfile} from "../../core/domain/PlayerProfile";

export function playerProfileRouter(
    queryPublisher: QueryPublisher
):  express.Router {
    const getAllPlayersProfiles = async (request: Request, response: Response) => {
        const queryResult = await queryPublisher.execute<FindAllPlayerProfilesResult>(new FindAllPlayerProfiles());
        return response.status(StatusCodes.OK).json(new PlayerProfilesListDto(queryResult.map(toPlayerProfileDto)));
    }

    const router = express.Router();
    router.get('', getAllPlayersProfiles);
    return router;
}

function toPlayerProfileDto(playerProfile: PlayerProfile): PlayerProfileDto {
    return new PlayerProfileDto(
        playerProfile.playerId,
        playerProfile.firstName,
        playerProfile.lastName,
        playerProfile.phoneNumber,
        playerProfile.emailAddress
    )
}