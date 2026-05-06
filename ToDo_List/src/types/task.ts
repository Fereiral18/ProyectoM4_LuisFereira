export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  userId: string;
  createdAt: number;
  index?:number;
};
export type TaskFilter = "all" | "completed" | "pending";


