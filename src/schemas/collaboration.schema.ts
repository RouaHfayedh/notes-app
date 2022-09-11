import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose  from 'mongoose';
import { User } from './user.schema';
import { Note } from './note.schema';
import { Type } from 'class-transformer';

export type CollaborationDocument = Collaboration & Document;

@Schema()
export class Collaboration {
  
  @Prop()
  id: Number;
  
  @Prop()
  privileges: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  collaborator: Number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Note.name })
  notes: Number[];

}

export const CollaborationSchema = SchemaFactory.createForClass(Collaboration);