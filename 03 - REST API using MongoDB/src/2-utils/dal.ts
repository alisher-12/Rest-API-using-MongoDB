import mongoose from "mongoose";

async function connect(): Promise<void> {
    try {
        const connectionString = "mongodb://127.0.0.1:27017/Northwind";
        const db = await mongoose.connect(connectionString);
        console.log("We're connected to MongoDB, database: " + db.connections[0].name);
    }
    catch(err: any) {
        console.log(err);
    }
}

export default {
    connect
};