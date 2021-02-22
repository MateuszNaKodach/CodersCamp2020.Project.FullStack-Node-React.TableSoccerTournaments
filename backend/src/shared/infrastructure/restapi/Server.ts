import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { RestApiModule } from './RestApiModule';

export function startRestApi(modules: RestApiModule[] = []) {
  const swaggerDocument = YAML.load('rest-api-v1.yaml');

  const server = express();

  const port = process.env.REST_API_PORT || 5000;

  modules.forEach((restApiModule) => {
    server.use('/rest-api/v1' + restApiModule.path, restApiModule.router);
  });

  server.use(process.env.API_DOCS_ENDPOINT_URL || '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  server.listen(port, () => {
    console.log(`[App]: Listening on port ${port}`);
  });
}
