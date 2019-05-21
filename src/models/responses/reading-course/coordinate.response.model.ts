import { Coordinate } from '../../../api/reading-course/coordinates/interfaces/coordinate.interfaces';

export class CoordinateResponse {

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

export function coordinatesResponseFactory(coo: Coordinate[]) {

  const coordinates = coo.map(c => {

    const cgl = c.coordinates.map(cooList => cooList.map(pos => new PositionXY(pos.x, pos.y)) );
    return new CoordinateResponse(c.letter, cgl);

  });

  return coordinates;

}
