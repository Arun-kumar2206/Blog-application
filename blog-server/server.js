import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect as DBconnect } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBconnect();

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});