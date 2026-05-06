import type { Task } from "../../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle?: (id: string, completed: boolean) => void;
  onDelete?: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  if (tasks.length === 0) {
    return <p>No hay tareas todavía.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle?.(task.id, task.completed)}
          onDelete={() => onDelete?.(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;