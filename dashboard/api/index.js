import express from 'express';
import 'dotenv/config';
import sequelize from './db/db.js';
import './models/event.js';
import './models/report.js';
import bodyParser from 'body-parser';
import WebsiteRouter from './routes/websites.js';
import AuthRouter from './routes/auth.js';

const app = express();

app.use(bodyParser.json());

sequelize.sync();
app.set('trust proxy', true);
app.use(AuthRouter);
app.use(WebsiteRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
