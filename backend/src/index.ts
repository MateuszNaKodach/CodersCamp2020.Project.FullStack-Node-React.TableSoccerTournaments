import { TableSoccerTournamentsApplication } from './app';

const port = process.env.REST_API_PORT || 5000;

const application = TableSoccerTournamentsApplication();

application.restApi.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
