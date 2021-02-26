import mongoose from 'mongoose';

export async function connectToMongoDb(): Promise<void> {
  const connectionString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  await mongoose
    .connect(connectionString, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`[TableSoccerTournamentsApplication]: Application connected to mongoDB instance at: ${connectionString}`))
    .catch((error) =>
      console.error(`[TableSoccerTournamentsApplication]: Error while connecting to mongo db at: ${connectionString}`, error),
    );
}
