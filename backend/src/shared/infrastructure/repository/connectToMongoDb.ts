import mongoose from 'mongoose';

export async function connectToMongoDb(): Promise<void> {
  const connectionString = process.env.MONGO_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('Connection string to MongoDB is not defined!');
  }
  await mongoose
    .connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`[TableSoccerTournamentsApplication]: Application connected to mongoDB instance at: ${connectionString}`))
    .catch((error) =>
      console.error(`[TableSoccerTournamentsApplication]: Error while connecting to mongo db at: ${connectionString}`, error),
    );
}
