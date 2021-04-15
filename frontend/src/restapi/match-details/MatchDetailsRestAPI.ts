import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { MatchDetailsDto } from "./MatchDetailsDto";

export type MatchDetailsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: MatchDetailsRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const MatchDetailsRestAPI = (
  config?: Partial<MatchDetailsRestApiConfig>
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
    getTournamentMatch(matchId: string): Promise<MatchDetailsDto> {
      return axios
        .get<MatchDetailsDto>(`${currentConfig.baseUrl}/matches/${matchId}`)
        .then((res) => res.data);
    },

    async postMatchWinner(
      matchId: string,
      winnerPlayerId: string
    ): Promise<void> {
      await axios.post(`${currentConfig.baseUrl}/matches/${matchId}/result`, {
        winnerId: winnerPlayerId,
      });
    },
  };
};
