import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose  from 'mongoose';
import { User } from './user.schema';
import { Type } from 'class-transformer'

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  
  @Prop()
  id: number;
  
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

}

export const NoteSchema = SchemaFactory.createForClass(Note);