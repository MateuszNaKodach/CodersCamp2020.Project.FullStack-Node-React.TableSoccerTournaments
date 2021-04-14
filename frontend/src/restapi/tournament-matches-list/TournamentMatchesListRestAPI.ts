import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { TournamentMatchesListDto } from "./TournamentMatchesListDto";

export type TournamentMatchesListRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TournamentMatchesListRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const TournamentMatchesListRestAPI = (
  config?: Partial<TournamentMatchesListRestApiConfig>
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
    getTournamentTeamsList(
      tournamentId: string
    ): Promise<TournamentMatchesListDto> {
      return axios
        .get<TournamentMatchesListDto>(
          `${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/matches`
        )
        .then((res) => res.data);
    },
  };
};
