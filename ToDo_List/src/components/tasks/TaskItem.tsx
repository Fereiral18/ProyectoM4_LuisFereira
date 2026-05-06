import type { Task } from "../../types/task";


interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "✔" : "❌"}
      </button>

      <button onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
    </div>
  );
};

export default TaskItem;