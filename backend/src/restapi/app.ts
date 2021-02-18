import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load('rest-api-v1.yaml');

const app = express();

const port = process.env.REST_API_PORT || 5000;

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})

app.use(process.env.API_DOCS_ENDPOINT_URL || '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



