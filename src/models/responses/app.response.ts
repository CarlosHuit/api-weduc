export class AppResponse {

  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {}

}
