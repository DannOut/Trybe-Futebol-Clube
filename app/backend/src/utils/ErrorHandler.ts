export default class ErrorHandler extends Error {
  //* https://javascript.info/custom-errors
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
