import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routes from './app/routes/index';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

// routes
// app.use('/api/v1/', routes);

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running');
});

// global error handler middleware
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
