import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../schemas/user.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post("add")
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Get('author/:id')
  findByAuther(@Param('id') id: string) {
    return this.notesService.findByAuther(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

}
