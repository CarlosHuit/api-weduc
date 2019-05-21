export class CommentForm {

  constructor(
    public readonly date: Date,
    public readonly text: string,
    public readonly userId: string,
    public readonly tempId: string,
    public readonly courseId: string,
  ) { }

}
