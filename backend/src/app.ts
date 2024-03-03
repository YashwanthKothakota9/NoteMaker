import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes.route';
import userRoutes from './routes/users.route';

import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use('/api/users', userRoutes);

app.use('/api/notes', notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occured';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
