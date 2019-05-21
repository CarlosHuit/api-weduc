import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './interfaces/course.interface';
import { CreateCourseDto } from './create-course.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  async saveCourse(createCourseDto: CreateCourseDto) {

    const course = new this.courseModel(createCourseDto);
    return await course.save();

  }

  async getCourse(course: string): Promise<Course> {

    const el = await this.courseModel.findOne({ subtitle: course });
    return el;

  }

  async getCourseByName(subtitle: string): Promise<Course> {
    return await this.courseModel.findOne({ subtitle });
  }

  async getAllCourses(): Promise<Course[]> {

    return await this.courseModel.find();

  }

  async hasData(): Promise<boolean> {

    const count = await this.courseModel.countDocuments({});
    return count > 0 ? true : false;

  }

}
