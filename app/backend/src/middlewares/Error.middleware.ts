import { ErrorRequestHandler } from 'express';

//* https://javascript.info/custom-errors
const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  // console.log('err :>> ', error);
  const { status, message } = error;
  return res.status(status).json({ message });
};

export default errorMiddleware;
