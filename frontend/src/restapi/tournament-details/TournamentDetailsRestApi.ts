import axios from "axios";
import {
  TournamentDetailsDto,
  TournamentDetailsListDto,
} from "./TournamentDetailsDto";

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
    getAllTournamentsDetails(): Promise<TournamentDetailsListDto> {
      return axios
        .get<TournamentDetailsListDto>(
          `${currentConfig.baseUrl}/tournament-details/`
        )
        .then((res) => res.data);
    },
    async addTournamentName(body: {
      tournamentId: string;
      tournamentName: string;
    }): Promise<void> {
      await axios.post(`${currentConfig.baseUrl}/tournament-details/`, body);
    },
  };
};
