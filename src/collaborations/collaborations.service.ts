import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose  from 'mongoose';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationDto } from './dto/update-collaboration.dto';
import { User } from '../schemas/user.schema';
import {Collaboration,CollaborationDocument } from '../schemas/collaboration.schema';
import { Model } from 'mongoose';

@Injectable()
export class CollaborationsService {
  constructor(@InjectModel(Collaboration.name) private collaborationModel: Model<CollaborationDocument>) {}
  async create(createCollaborationDto: CreateCollaborationDto) {
    console.log(createCollaborationDto);
    const createdPost = new this.collaborationModel(createCollaborationDto);
    await createdPost.populate('notes');
    return createdPost.save();
  }

  async findAll() {
    return await this.collaborationModel.find().exec();
  }

  async findOne(id: string) {
    console.log(id)
    const collab= await this.collaborationModel.findById(new mongoose.Types.ObjectId(id)).exec();
    console.log(collab)
    return collab;
  }

  update(id: string, updateCollaborationDto: UpdateCollaborationDto) {
    console.log(id)
    return this.collaborationModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{privileges:updateCollaborationDto["privileges"]})
  }

  remove(id: string) {
    return this.collaborationModel.findByIdAndDelete(new mongoose.Types.ObjectId(id)).exec();
  }

  getByCollab(id: string){
    return this.collaborationModel.findOne({collaborator:new mongoose.Types.ObjectId(id)}).populate('notes').exec();
  }
}
