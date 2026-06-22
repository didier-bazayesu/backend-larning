import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import swaggerspec from './controllers/swagger.js';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/database.js';

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerspec));
app.use('/api/auth', authRoutes);

app.listen(process.env["PORT"] || 3000, (req) => {
  console.log(`Server is running on http://localhost:${process.env["PORT"] || 3000} 🔥🚀 🔥🚀`);
});

connectDB()