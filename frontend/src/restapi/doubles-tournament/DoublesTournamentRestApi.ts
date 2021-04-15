import axios from "axios";
import {PATH_BASE_URL} from "../../components/atoms/constants/apiPaths";
import {TournamentPlaceListDto} from "./TournamentPlaceListDto";

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
                .get<TournamentPlaceListDto>(`${currentConfig.baseUrl}/doubles-tournament/${tournamentId}/places`)
                .then((res) => res.data)
        },
    };
};
