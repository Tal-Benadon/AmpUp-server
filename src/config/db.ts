import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL as string
export function connect() {
    try {        
        mongoose.connect(MONGO_URL)
            .then(r => console.log("DB - Connected"))
    }
    catch (err) {
        console.log("DB - Error: ", err);
    }
} 
