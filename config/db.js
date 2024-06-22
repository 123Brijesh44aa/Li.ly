import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {

        const connection_url = process.env.MONGO_DB_CONNECTION_URL_STRING;


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