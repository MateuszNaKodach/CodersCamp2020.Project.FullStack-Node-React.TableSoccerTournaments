import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { MatchesListDto } from "../../components/organisms/MatchesList/MatchesListDto";

export type MatchesListRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: MatchesListRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const MatchesListRestApi = (
  config?: Partial<MatchesListRestApiConfig>
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
    getMatchesList(tournamentId: string): Promise<MatchesListDto> {
      return axios
        .get<MatchesListDto>(
          `${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/matches`
        )
        .then((res) => res.data);
    },
  };
};
