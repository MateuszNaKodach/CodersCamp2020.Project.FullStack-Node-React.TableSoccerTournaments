import { ModuleCore } from './core/ModuleCore';
import { ModuleRestApi } from './presentation/rest-api/ModuleRestApi';

/**
 * Module is fully-featured part of the application.
 * Module core is required - it's domain and application layer.
 * REST API is not required - not necessary for module to be usable. Not every module needs to expose REST API.
 * Some of them may be only used internally and communicate with others by Commands and Events (Queries are not recommended between modules).
 */
export type Module = {
  core: ModuleCore;
  restApi?: ModuleRestApi;
};
