import { IsNotEmpty } from '@nestjs/class-validator';
export class CreateNoteDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    idUser: string;
}
