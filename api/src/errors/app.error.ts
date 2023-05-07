class AppErrors {
  public readonly message: string | object;
  public readonly status: number;

  constructor(message: string | object, status = 400) {
    this.message = message;
    this.status = status;
  }
}

export default AppErrors;
