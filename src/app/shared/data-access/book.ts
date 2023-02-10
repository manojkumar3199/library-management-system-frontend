import { Category } from "./category";

export interface Book {
    category: Category,
    id: number,
    title: string,
    author: string,
    description: string,
    imageUrl: string
}
