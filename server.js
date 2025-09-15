import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.route.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'https://online-store-front-499gdj1db-jalomamadjams-projects.vercel.app',
  methods: ['GET','POST','PUT','DELETE'],
}));

app.use(express.json()); //middleware 
app.use("/api/products", productRoutes);



app.listen(PORT, async() => {
    await connectDB();
    console.log("Server listening on port " + PORT);
});
