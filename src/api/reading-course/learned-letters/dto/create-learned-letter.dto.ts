export class CreateLearnedLetterDto {

  constructor(
    public readonly letter: string,
    public readonly rating: number,
  ) {}

}
