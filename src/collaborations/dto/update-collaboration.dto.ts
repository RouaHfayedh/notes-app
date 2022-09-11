import { PartialType } from '@nestjs/mapped-types';
import { Equals } from '@nestjs/class-validator';
import { CreateCollaborationDto } from './create-collaboration.dto';

export class UpdateCollaborationDto extends PartialType(CreateCollaborationDto) {
    @Equals('WR'||'R')
    privileges: string;
}
