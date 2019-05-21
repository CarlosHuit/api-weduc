export class CreateCourseDto {

  constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly imageUrl: string,
    public readonly urlVideo: string,
    public readonly description: string,
  ) {}

}
