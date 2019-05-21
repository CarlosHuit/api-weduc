import { UserResponse } from './user.response.model';
import { User } from '../../../api/users/interfaces/user.interface';
import { CourseResponse } from '../course.response.model';
import { Course } from '../../../api/courses/interfaces/course.interface'; 

export class AuthResponse {

  constructor(
    public user: UserResponse,
    public token: string,
    public courses: CourseResponse[],
    public message: string,
  ) {}

  static parse(user: User, token: string, courses: Course[]): AuthResponse {

    const u = new UserResponse(
      user._id,
      user.firstName,
      user.lastName,
      user.email,
      user.avatar,
    );
  
    const c = courses.map(e => new CourseResponse(
      e.id,
      e.title,
      e.subtitle,
      e.imageUrl,
      e.urlVideo,
      e.description,
    ));
  
    return new AuthResponse( u, token, c, 'Login Success' );

  }

}
