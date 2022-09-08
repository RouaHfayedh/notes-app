import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  
  @Prop()
  id: number;
  
  @Prop()
  title: string;

  @Prop()
  description: string;

}

export const NoteSchema = SchemaFactory.createForClass(Note);