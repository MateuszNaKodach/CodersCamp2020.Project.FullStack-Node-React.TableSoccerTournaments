import {AppModule} from "../../shared/AppModule";

export type CurrentTimeProvider = () => Date
export const TournamentsRegistrationsModule = (currentTimeProvider: CurrentTimeProvider) => {
  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: []
  } as AppModule
}
