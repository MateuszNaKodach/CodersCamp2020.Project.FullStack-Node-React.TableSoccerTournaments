import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ModuleRestApi } from '../../presentation/rest-api/ModuleRestApi';
import bodyParser from 'body-parser';
import cors from 'cors';

export function restApiExpressServer(modules: ModuleRestApi[] = []): Express {
  const swaggerDocument = YAML.load('./src/rest-api-docs.yaml');
  const server = express();
  server.use(bodyParser.json());
  server.use(cors());

  modules.forEach((restApiModule) => {
    server.use('/rest-api' + restApiModule.path, restApiModule.router);
  });

  server.use(process.env.API_DOCS_ENDPOINT_URL || '/rest-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return server;
}
