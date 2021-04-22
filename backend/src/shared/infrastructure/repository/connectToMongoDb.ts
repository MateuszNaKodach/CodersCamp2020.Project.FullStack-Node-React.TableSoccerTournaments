import mongoose from 'mongoose';

export async function connectToMongoDb(): Promise<void> {
    const connectionString = `mongodb+srv://${process.env.MONGO_USER_HEROKU}:${process.env.MONGO_PASSWORD_HEROKU}@${process.env.MONGO_HOST_HEROKU}/${process.env.MONGO_DB_HEROKU}?retryWrites=true&w=majority`;
    await mongoose
        .connect(connectionString, {
            user: process.env.MONGO_USER_HEROKU,
            pass: process.env.MONGO_PASSWORD_HEROKU,
            dbName: process.env.MONGO_DB_HEROKU,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log(`[TableSoccerTournamentsApplication]: Application connected to mongoDB instance at: ${connectionString}`))
        .catch((error) =>
            console.error(`[TableSoccerTournamentsApplication]: Error while connecting to mongo db at: ${connectionString}`, error),
        );
}
