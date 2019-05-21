export class CreateWordDto {
  constructor(
    public readonly letter: string,
    public readonly words: string[],
  ) {}
}
