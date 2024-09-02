export class handleError extends Error {
  code: number;

  constructor(code: number, message: string | undefined) {
    super(message);
    this.code = code || 500;
  }
}
