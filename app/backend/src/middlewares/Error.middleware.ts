import { ErrorRequestHandler, Request, Response } from 'express';

//* https://javascript.info/custom-errors
const errorMiddleware: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

export default errorMiddleware;
