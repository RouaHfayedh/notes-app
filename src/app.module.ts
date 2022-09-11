import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { CollaborationsModule } from './collaborations/collaborations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/notes_app'),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    NotesModule,
    CollaborationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
