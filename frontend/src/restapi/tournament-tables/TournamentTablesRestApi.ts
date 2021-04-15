import axios from "axios";
import { TablesList } from "../../components/organisms/CreateTournamentForm/CreateTournamentForm";

export type TournamentTablesRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: TournamentTablesRestApiConfig = {
  baseUrl: "http://localhost:5000/rest-api",
};

export const TournamentTablesRestApi = (
  config?: Partial<TournamentTablesRestApiConfig>
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
    async addTournamentsTables(params: {
      tournamentId: string;
      tablesBody: TablesList;
    }): Promise<void> {
      await axios.post(
        `${currentConfig.baseUrl}/tournaments/${params.tournamentId}/tables`,
        params.tablesBody,
        { params: params.tournamentId }
      );
    },
  };
};
