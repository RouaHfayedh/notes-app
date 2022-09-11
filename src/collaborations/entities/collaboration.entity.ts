import { User } from '../../schemas/user.schema';
import { Note } from '../../schemas/note.schema';
export class Collaboration {
    id: number;
    privileges: string;
    collaborator: Number;
    notes: Number[];
}

