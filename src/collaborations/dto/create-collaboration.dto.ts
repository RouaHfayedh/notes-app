import { IsNotEmpty, Equals } from '@nestjs/class-validator';
export class CreateCollaborationDto {

    @IsNotEmpty()
    collaborator: string;

    @Equals('WR'||'R')
    privileges: string;

}
