import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectdb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import spaceRoutes from './routes/spaceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectdb();

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for JSON body parsing
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));
 

// app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
