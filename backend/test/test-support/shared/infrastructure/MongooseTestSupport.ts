import mongoose from 'mongoose';

export async function openTestMongoDbConnection(): Promise<void> {
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

export const closeTestMongoDbConnection: () => Promise<void> = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
 * Remove all the data for all db collections.
 */
export const clearTestMongoDb: () => Promise<void> = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
