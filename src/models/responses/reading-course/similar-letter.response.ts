export class SimilarLetterResponse {

  constructor(
    public readonly letter: string,
    public readonly similarLetters: string[],
  ) {}

}
