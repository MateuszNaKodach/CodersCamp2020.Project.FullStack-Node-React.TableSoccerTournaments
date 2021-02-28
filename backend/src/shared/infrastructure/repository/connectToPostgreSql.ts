import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export async function connectToPostgreSql(): Promise<Connection> {
  const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['**/postgresql/*Entity{.ts,.js}'],
    synchronize: true,
  };

  return createConnection(config)
    .then((connection) => {
      console.log(`[TableSoccerTournamentsApplication]: Application connected to postgreSQL instance at: ${config.port}:${config.host}`);
      return connection;
    })
    .catch((error) => {
      console.error(
        `[TableSoccerTournamentsApplication]: Error while connecting to postgreSQL db at: ${config.port}:${config.host}`,
        error,
      );
      throw error;
    });
}
