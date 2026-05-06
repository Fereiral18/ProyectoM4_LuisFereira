import type { Task } from "../../types/task";

interface Props {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
 
  return (
<div className={`task-item ${task.completed ? "done" : ""}`}>
  <div className="task-content">
    <h3>{task.title}</h3>
    <p>{task.description}</p>

    <small>📅 {task.dueDate || "Sin fecha"}</small>
  </div>

  <div className="task-actions">
    <button onClick={() => onToggle(task.id, task.completed)}>
      {task.completed ? "✔" : "○"}
    </button>

    <button onClick={() => onDelete(task.id)}>🗑</button>
  </div>
</div>
  );
};

export default TaskItem;