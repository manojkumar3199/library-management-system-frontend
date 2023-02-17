import { Book } from "./book";
import { Student } from "./student";

export interface Issuebook {
    id: number,
    book: Book,
    issueDate: string,
    expiringDate: string,
    fine: number,
    student: Student
}
