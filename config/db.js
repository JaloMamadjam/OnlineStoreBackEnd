import mongoose from "mongoose";

import dotenv from 'dotenv';

//mX02wIhz3Hg6Evhq
dotenv.config();

export const connectDB = async () => {
    try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('MongoDB Connected')
        }catch(error){
            console.error(`Error : ${error.message}`);
            process.exit(1);
        }
}

