import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {NoteDocument } from '../schemas/note.schema';
import { Note } from '../notes/entities/note.entity';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as mongoose  from 'mongoose';
@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto) {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll() {
    return await this.noteModel.find().exec();
  }

  async findOne(id: number) {
    const notes= await this.noteModel.find({id:id}).exec();
    return notes[0];
  }

  async findByAuther(id: string){
    const user= await this.noteModel.find({author:new mongoose.Types.ObjectId(id)}).exec();
    return user;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    console.log(id)
    return this.noteModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{title:updateNoteDto["title"],description:updateNoteDto["description"]}).exec();
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(new mongoose.Types.ObjectId(id)).exec();
  }

}
