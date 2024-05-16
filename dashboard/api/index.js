import { ExpressAuth, getSession } from '@auth/express';
import Google from '@auth/express/providers/google';
import express from 'express';
import 'dotenv/config';
import SequelizeAdapter from '@auth/sequelize-adapter';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
};

// If app is served through a proxy, trust the proxy to allow HTTPS protocol to be detected
// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);
app.use('/api/auth/*', ExpressAuth(authConfig));

export async function authSession(req, res, next) {
  res.locals.session = await getSession(req, authConfig);
  next();
}

app.use(authSession);

app.get('/api/session', (req, res) => {
  res.json(res.locals.session || {});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
