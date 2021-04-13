import axios from "axios";
import { PATH_BASE_URL } from "../../components/atoms/constants/apiPaths";
import { MatchInformationDto } from "../../components/organisms/MatchesList/MatchInformationDto";

export type MatchInformationRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: MatchInformationRestApiConfig = {
  baseUrl: PATH_BASE_URL,
};

export const MatchInformationRestApi = (
  config?: Partial<MatchInformationRestApiConfig>
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
    getMatchesList(matchId: string): Promise<MatchInformationDto> {
      return axios
        .get<MatchInformationDto>(`${currentConfig.baseUrl}/matches/${matchId}`)
        .then((res) => res.data);
    },
  };
};
