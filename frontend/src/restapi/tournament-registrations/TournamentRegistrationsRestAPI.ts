import axios from "axios";

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
    async postPlayersForTournament(body: {
      tournamentId: string;
      playerId: string;
    }): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/tournament-registrations/:${body.tournamentId}/players`,
        body
      );
    },
  };
};
