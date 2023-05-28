import { Category } from "./category";
import { User } from "./user";

export interface Task {
    id?: number;
    priority: string;
    title: string;
    description: string;
    due_date: Date;
    status: string;
    category: Category;
    assigned_users: Array<User>;
}