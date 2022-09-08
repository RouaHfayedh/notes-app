import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note } from '../notes/entities/note.entity';
import { NoteSchema } from '../schemas/note.schema';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  exports: [NotesService],
})
export class NotesModule {}
