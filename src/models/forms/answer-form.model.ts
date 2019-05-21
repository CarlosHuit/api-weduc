export class AnswerForm {

  constructor(
    public readonly text: string,
    public readonly date: Date,
    public readonly tempId: string,
    public readonly userId: string,
    public readonly commentId: string,
  ) { }

}
