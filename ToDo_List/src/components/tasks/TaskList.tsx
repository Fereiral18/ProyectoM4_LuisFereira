import type { Task } from "../../types/task";
import TaskItem from "./TaskItem";
import "./style.css"

interface Props {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: Props) => {
  if (!tasks.length) return <p>No hay tareas todavía.</p>;

  return (
   <div className="task-list">
  {tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onToggle={onToggle}
      onDelete={onDelete}
    />
  ))}
</div>
  );
};

export default TaskList;