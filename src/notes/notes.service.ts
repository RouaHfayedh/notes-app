import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {NoteDocument } from '../schemas/note.schema';
import { Note } from '../notes/entities/note.entity';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private userModel: Model<NoteDocument>) {}

  create(createNoteDto: CreateNoteDto) {
    const createdNote = new this.userModel(createNoteDto);
    return createdNote.save();
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
