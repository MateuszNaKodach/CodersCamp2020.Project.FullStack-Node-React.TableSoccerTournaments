import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { TeamsListDto } from "../../components/organisms/MatchesList/TeamsListDto";

export type TeamsListRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TeamsListRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const TeamsListRestApi = (config?: Partial<TeamsListRestApiConfig>) => {
  const currentConfig = {
    ...defaultConfig,
    config,
    baseUrl:
      process.env.REACT_APP_REST_API_BASE_URL ??
      config?.baseUrl ??
      defaultConfig.baseUrl,
  };
  return {
    getMatchesList(tournamentId: string): Promise<TeamsListDto> {
      return axios
        .get<TeamsListDto>(
          `${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/teams`
        )
        .then((res) => res.data);
    },
  };
};
