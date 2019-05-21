class Syllable {

  constructor(
    public readonly w: string,
    public readonly p: string,
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
class Combinations {

  constructor(
    public readonly combination: string,
    public readonly word: string,
    public readonly syllable: Syllable,
    public readonly syllables: string[],
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
export class CreateCombinationDto {

  constructor(
    public readonly letter: string,
    public readonly combinations: Combinations[],
  ) {}

}
