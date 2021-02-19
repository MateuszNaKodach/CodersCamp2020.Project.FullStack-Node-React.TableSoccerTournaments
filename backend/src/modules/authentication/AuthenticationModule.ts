import {AppModule} from "../shared/AppModule";

export const AuthenticationModule: () => AppModule = () => {

  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: []
  }
}
