export class CreateSimilarLetterDto {

  constructor(
    public readonly letter: string,
    public readonly similarLetters: string[],
  ) {}

}
