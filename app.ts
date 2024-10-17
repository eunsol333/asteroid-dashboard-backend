import express from 'express';
import asteroidsRoutes from './routes/asteroids';

const app = express();

app.use(asteroidsRoutes);

app.listen(3000);