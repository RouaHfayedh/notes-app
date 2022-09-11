import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';
import { User } from '../schemas/user.schema';
import * as mongoose  from 'mongoose';


@Controller('collaborations')
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Post('add')
  create(@Body() createCollaborationDto: CreateCollaborationDto) {
    console.log(createCollaborationDto)
    return this.collaborationsService.create(createCollaborationDto);
  }

  @Get()
  findAll() {
    return this.collaborationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaborationsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCollaborationDto: UpdateCollaborationDto) {
    return this.collaborationsService.update(id, updateCollaborationDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.collaborationsService.remove(id);
  }
}
