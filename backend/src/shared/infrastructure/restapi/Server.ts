import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { ModuleRestApi } from "./ModuleRestApi";
import bodyParser from "body-parser";

export function restApiExpressServer(modules: ModuleRestApi[] = []): Express {
  const swaggerDocument = YAML.load('rest-api.yaml');
  const server = express();
  server.use(bodyParser.json());

  modules.forEach((restApiModule) => {
    server.use('/rest-api' + restApiModule.path, restApiModule.router);
  });

  server.use(process.env.API_DOCS_ENDPOINT_URL || '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return server;
}
