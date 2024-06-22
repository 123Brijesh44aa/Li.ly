import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {

        let connection_url = process.env.MONGO_DB_CONNECTION_URL_STRING;
        const mongo_password = process.env.MONGO_DB_PASSWORD;
        const mongo_ursername = process.env.MONGO_DB_USERNAME;

        connection_url = connection_url.replace("<username>", mongo_ursername);
        connection_url = connection_url.replace("<password>", mongo_password);


        const connection = await mongoose.connect(connection_url)
            .then(() => {
                console.log(`Connected to MongoDB`);
            }).catch((err) => {
                console.log(err);
            });


    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;