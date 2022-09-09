import { User } from '../../schemas/user.schema';
export class Note {
    id: number;
    title: string;
    description: string;
    author: User;
}
