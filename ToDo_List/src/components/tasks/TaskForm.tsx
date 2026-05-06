import { useState } from "react";
import { createTask } from "../../services/tasks.service";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onTaskCreated?: () => void;
}

const TaskForm = ({ onTaskCreated }: Props) => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
    if (!title.trim()) return;

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        userId: user.uid,
      });

      setTitle("");
      setDescription("");

      onTaskCreated?.(); // refrescar lista si quieres
    } catch (error) {
      console.error("Error creando tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear tarea"}
      </button>
    </form>
  );
};

export default TaskForm;