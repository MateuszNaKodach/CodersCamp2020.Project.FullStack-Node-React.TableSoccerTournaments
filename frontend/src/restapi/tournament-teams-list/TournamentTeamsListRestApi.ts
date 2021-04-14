import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { TournamentTeamsListDto } from "./TournamentTeamsListDto";

export type TeamsListRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TeamsListRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const TournamentTeamsListRestApi = (
  config?: Partial<TeamsListRestApiConfig>
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
    getTournamentMatch(
      tournamentId: string
    ): Promise<TournamentTeamsListDto> {
      return axios
        .get<TournamentTeamsListDto>(
          `${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/teams`
        )
        .then((res) => res.data);
    },
  };
};
