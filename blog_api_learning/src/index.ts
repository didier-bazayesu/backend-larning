import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import swaggerspec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/database.js';
import morgan from 'morgan'
import blogRoutes from './routes/blogRoutes.js'
import ProductRoutes from './routes/productRoutes.js'


const app = express();
app.use(morgan('dev')); // ← add this
app.use(express.json()); // ← add this
app.use(express.urlencoded({ extended: true }));
app.get('/test', (req, res) => {
  res.json({ message: 'server works' });
});
app.post('/test', (req, res) => {
  console.log('body:', req.body);
  res.json({ body: req.body });
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerspec));
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes)
app.use('/api/products',ProductRoutes)

app.listen(process.env["PORT"] || 5000, (req) => {
  console.log(`Server is running on http://localhost:${process.env["PORT"] || 5000} 🔥🚀 🔥🚀`);
});

connectDB()