  // tslint:disable-next-line: max-classes-per-file
class Combination {
  constructor(
    public readonly w: string,
    public readonly p: string,
  ) {}
}

// tslint:disable-next-line: max-classes-per-file
class AlphabetCombination {
  constructor(
    public readonly letter: string,
    public readonly combinations: Combination[],
  ) {}
}

// tslint:disable-next-line: max-classes-per-file
class SoundLetters {
  constructor(
    public readonly letter: string,
    public readonly sound: string,
  ) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateLetterDto {

  constructor(
    public readonly vocals: string,
    public readonly consonants: string,
    public readonly alphabet: string,
    public readonly combinations: AlphabetCombination[],
    public readonly letterSounds: SoundLetters[],
  ) {}

}
