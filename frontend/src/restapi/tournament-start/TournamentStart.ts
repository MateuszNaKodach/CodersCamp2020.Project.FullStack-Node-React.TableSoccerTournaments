import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";

export type TournamentStartRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TournamentStartRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const TournamentStartRestApi = (
  config?: Partial<TournamentStartRestApiConfig>
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
    async startTournament(tournamentId: string): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/doubles-tournaments/${tournamentId}/start`,
        null,
        { params: { tournamentId } }
      );
    },
  };
};
