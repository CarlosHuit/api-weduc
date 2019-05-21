export class CreateCoordinateDto {

  constructor(
    public readonly letter: string,
    public readonly coordinates: PositionXY[][],
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
export class PositionXY {

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

}
