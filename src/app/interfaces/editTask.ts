import { Category } from "./category";

export interface EditTask {
    id?: number;
    priority?: string;
    title?: string;
    description?: string;
    due_date?: string | Date;
    status?: string;
    category?: any;
    assigned_users?: Array<number>;
}