import axios from "axios";
import { TournamentRegistrationsDto } from "../../components/pages/TournamentRegistrations/TournamentRegistrationsDto";

export type TournamentRegistrationsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TournamentRegistrationsRestApiConfig = {
  baseUrl: "http://localhost:5000/rest-api",
};

export const TournamentRegistrationsRestApi = (
  config?: Partial<TournamentRegistrationsRestApiConfig>
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
    getRegisteredPlayersIds(
      tournamentId: string
    ): Promise<TournamentRegistrationsDto> {
      return axios
        .get<TournamentRegistrationsDto>(
          `${currentConfig.baseUrl}/tournament-registrations/${tournamentId}`
        )
        .then((res) => res.data);
    },
    async postPlayersForTournament(body: {
      tournamentId: string;
      playerId: string;
    }): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/tournament-registrations/${body.tournamentId}/players`,
        body
      );
    },
  };
};
