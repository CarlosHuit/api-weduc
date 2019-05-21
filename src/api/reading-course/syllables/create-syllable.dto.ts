export class CreateSyllableDto {
  constructor(
    readonly letter: string,
    readonly syllables: string[][],
  ) {}
}
