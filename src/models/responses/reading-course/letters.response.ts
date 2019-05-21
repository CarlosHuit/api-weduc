export class LettersResponse {

  constructor(
    public readonly vocals: string,
    public readonly alphabet: string,
    public readonly consonants: string,
    public readonly letterSounds: LetterSound[],
    public readonly combinations: AlphabetCombination[],
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
export class Combination {

  constructor(
    public readonly w: string,
    public readonly p: string,
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
export class AlphabetCombination {

  constructor(
    public readonly letter: string,
    public readonly combinations: Combination[],
  ) {}

}

// tslint:disable-next-line: max-classes-per-file
export class LetterSound {

  constructor(
    public readonly letter: string,
    public readonly sound: string,
  ) {}

}
