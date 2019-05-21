import { User } from '../../../api/users/interfaces/user.interface';

export class UserResponse {

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public avatar: string,
  ) {}

  fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

}

export function userResponseFactory(user: User): UserResponse {

  return new UserResponse(
    user._id,
    user.firstName,
    user.lastName,
    user.email,
    user.avatar,
  );

}
