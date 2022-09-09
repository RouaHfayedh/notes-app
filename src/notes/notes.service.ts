import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {NoteDocument } from '../schemas/note.schema';
import { Note } from '../notes/entities/note.entity';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(createNoteDto: CreateNoteDto, author: User) {
    const createdNote = new this.noteModel(createNoteDto,author);
    return createdNote.save();
  }

  async findAll() {
    return await this.noteModel.find().exec();
  }

  async findOne(id: number) {
    const user= await this.noteModel.find({id:id}).exec();
    return user[0];
  }

  async findByAuther(id: number){
    const user= await this.noteModel.find({idUser:id}).exec();
    return user[0];
  }

}
