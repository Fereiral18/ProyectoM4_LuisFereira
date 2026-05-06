import React, { useState } from "react";
import "./style.css"

interface TaskFormProps {
  onAdd: (title: string, description: string, dueDate: string) => void;
}

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    setError("");
    onAdd(title, description, dueDate);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
   <form className="task-form" onSubmit={handleSubmit}>
  <h3>Nueva tarea</h3>

  <input
    type="text"
    placeholder="Título de la tarea"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <textarea
    placeholder="Descripción (opcional)"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    required
  />

  {error && <p className="error">{error}</p>}

  <button type="submit">Agregar tarea</button>
</form>
  );
};