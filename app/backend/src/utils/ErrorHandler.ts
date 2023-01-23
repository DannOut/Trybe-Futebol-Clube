export default class HandleError extends Error {
  private _status: number;
  private _message: string;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
    this._message = message;
  }
}
