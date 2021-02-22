import { AppModule } from './core/AppModule';
import { RestApiModule } from './infrastructure/restapi/RestApiModule';

export type Feature = {
  appModule: AppModule;
  restApiModule: RestApiModule;
};
