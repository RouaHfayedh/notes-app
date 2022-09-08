import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserDocument } from '../schemas/user.schema';
import { User } from '../users/entities/user.entity';



@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  } 

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(email: string) {
    const user= await this.userModel.find({email:email}).exec();
    return user[0];
  }

  async findUser(id: number) {
    const user= await this.userModel.find({id:id}).exec();
    return user;
  }
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
