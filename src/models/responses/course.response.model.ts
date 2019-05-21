import { Course } from '../../api/courses/interfaces/course.interface';

export class CourseResponse {

  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public imageUrl: string,
    public urlVideo: string,
    public description: string,
  ) { }

}

export function courseResponseFactory(course: Course): CourseResponse {

  return new CourseResponse(
    course._id,
    course.title,
    course.subtitle,
    course.imageUrl,
    course.urlVideo,
    course.description,
  );

}
