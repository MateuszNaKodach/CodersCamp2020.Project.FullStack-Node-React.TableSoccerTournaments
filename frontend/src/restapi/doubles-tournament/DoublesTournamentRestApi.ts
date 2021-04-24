import axios from "axios";
import {PATH_BASE_URL} from "../../components/atoms/constants/apiPaths";
import {TournamentPlaceListDto} from "./TournamentPlaceListDto";
import {DoublesTournamentDto} from "./DoublesTournamentDto";
import {TournamentTeamsListDto} from "../tournament-teams-list/TournamentTeamsListDto";

export type DoublesTournamentRestApiConfig = {
    readonly baseUrl: string;
};

const defaultConfig: DoublesTournamentRestApiConfig = {
    baseUrl: PATH_BASE_URL,
};

export const DoublesTournamentRestAPI = (
    config?: Partial<DoublesTournamentRestApiConfig>
) => {
    const currentConfig = {
        ...defaultConfig,
        config,
        baseUrl:
            process.env.REACT_APP_REST_API_BASE_URL ??
            config?.baseUrl ??
            defaultConfig.baseUrl,
    };
    return {
        getTournamentPlaces(tournamentId: string): Promise<TournamentPlaceListDto> {
            return axios
                .get<TournamentPlaceListDto>(`${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/places`)
                .then((res) => res.data)
        },
        getDoublesTournament(tournamentId: string): Promise<DoublesTournamentDto> {
            return axios
                .get<DoublesTournamentDto>(`${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}`)
                .then((res) => res.data)
        },
        getTournamentTeams(tournamentId: string): Promise<TournamentTeamsListDto> {
            return axios
                .get<TournamentTeamsListDto>(`${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/teams`)
                .then((res) => res.data);
        }
    };
};
