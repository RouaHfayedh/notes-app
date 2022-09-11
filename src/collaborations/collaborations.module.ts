import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaboration,CollaborationSchema } from '../schemas/collaboration.schema';

@Module({
  controllers: [CollaborationsController],
  providers: [CollaborationsService],
  imports: [MongooseModule.forFeature([{ name: Collaboration.name, schema: CollaborationSchema }])],
  exports: [CollaborationsService],
})
export class CollaborationsModule {}
