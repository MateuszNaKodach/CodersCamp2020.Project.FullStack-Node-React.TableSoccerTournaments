import axios from "axios";
import { TournamentDetailsDto } from "./TournamentDetailsDto";

export type TournamentDetailsRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TournamentDetailsRestApiConfig = {
  baseUrl: "http://localhost:5000/rest-api",
};

export const TournamentDetailsRestApi = (
  config?: Partial<TournamentDetailsRestApiConfig>
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
    getAllTournamentsDetails(): Promise<TournamentDetailsDto[]> {
      return axios
        .get<TournamentDetailsDto[]>(
          `${currentConfig.baseUrl}/tournament-details/`
        )
        .then((res) => res.data);
    },
  };
};
