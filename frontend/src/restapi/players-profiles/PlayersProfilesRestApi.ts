import axios, { AxiosResponse } from "axios";
import { PlayerProfilesListDto } from "./PlayerProfilesListDto";

export type UserProfilesRestApiConfig = {
  readonly baseUrl: string;
};

const defaultConfig: UserProfilesRestApiConfig = {
  baseUrl: "http://localhost:5000/rest-api",
};

export const UserProfileRestApi = (
  config?: Partial<UserProfilesRestApiConfig>
) => {
  const currentConfig = {
    ...defaultConfig,
    config,
  };
  return {
    getPlayersProfiles(): Promise<PlayerProfilesListDto> {
      return axios
        .get<PlayerProfilesListDto>(`${currentConfig.baseUrl}/players-profiles`)
        .then((response) => response.data);
    },
  };
};
