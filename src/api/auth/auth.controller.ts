import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { compareSync as comparePassword, hashSync as hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { secret } from '../../config';
import { AuthForm } from '../../models/forms/auth-form.model';
import { SignupForm } from '../../models/forms/signup-form.model';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthResponse } from '../../models/responses/auth/auth.response.model';
import { CreateUserDto } from '../users/create-user.dto';
import { CoursesService } from '../courses/courses.service';
import { CreateAccountDto } from './create-account.dto';
import { LearnedLettersService } from '../reading-course/learned-letters/learned-letters.service';

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly courseService: CoursesService,
    private readonly learnedLetterService: LearnedLettersService,
  ) { }

  @Post('signup')
  async signupPost(@Body() body: SignupForm): Promise<AuthResponse> {


    const emailIsAvailable = await this.authService.emailIsAvailable(body.email);


    if (!emailIsAvailable) {
      throw new UnauthorizedException( this.unavailableEmail(body.email) );
    }


    if (body.password !== body.password2) {
      throw new UnauthorizedException('Las contraseñas no coinciden');
    }


    const newUser = new CreateUserDto( body.firstName, body.lastName, body.email, body.avatar );
    const user    = await this.usersService.saveUser(newUser);
    const token   = this.generateToken(user);


    const userId   = new mongoose.Types.ObjectId(user.id);
    const password = hash(body.password, 10);

    const newAuth  = new CreateAccountDto( body.email, password, userId );
    const auth     = await this.authService.saveAuth(newAuth);
    const progress = await this.learnedLetterService.initialize(user.id);
    const courses  = await this.courseService.getAllCourses();

    return AuthResponse.parse(user, token, courses);

  }

  @Post('signin')
  async signin(@Body() body: AuthForm) {


    const account = await this.authService.getAuthByEmail(body.email);


    if (!account) {
      throw new UnauthorizedException(this.invalidEmail(body.email));
    }


    if (!comparePassword(body.password, account.password )) {
      throw new UnauthorizedException(this.invalidPassword());
    }


    const user = await this.usersService.getUserByEmail(body.email);
    const token = this.generateToken(user);
    const courses = await this.courseService.getAllCourses();


    return AuthResponse.parse(user, token, courses);

  }

  generateToken(user: User) {
    return jwt.sign({ user }, secret, { expiresIn: 2592000 });
  }

  unavailableEmail(email: string): string {
    return `El email: '${email}' ya se encuentra registrado. Verifica y vuelve a intentarlo.`;
  }

  invalidEmail(email: string): string {
    return `El email: ${email} no existe. \n Verifica y vuelve a intentarlo.`;
  }

  invalidPassword(): string {
    return 'Contraseña incorrecta, vuelve a intentarlo.';
  }

}
