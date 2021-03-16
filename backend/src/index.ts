import { TableSoccerTournamentsApplication } from './app';

const port = process.env.REST_API_PORT || process.env.PORT || 5000;

TableSoccerTournamentsApplication().then(({ restApi }) =>
  restApi.listen(port, () => {
    console.log(`[App]: REST API listening on port ${port}`);
    console.log(`[App]: You can access REST API documentation at http://localhost:${port}/rest-api-docs`);
  }),
);
