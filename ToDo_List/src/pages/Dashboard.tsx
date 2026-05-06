import { useState } from "react";
import type { TaskFilter } from "../types/task";

import { useAuth } from "../context/AuthContext";
import TaskList from "../components/tasks/TaskList";
import { TaskForm } from "../components/tasks/TaskForm";
import { useTasks } from "../hooks/useTask";


const Dashboard = () => {
  const { user, loading } = useAuth();

  const {
    tasks,
    loading: loadingTasks,
    error,
    addTask,
    toggleTaskStatus,
    removeTask,
  } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>("all");
if (!user?.uid) return;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No autorizado</p>;

  return (
    <div>
      <h1>Mis tareas</h1>

      <TaskForm onAdd={addTask} />

      <div>
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
      </div>

      {loadingTasks && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <TaskList
        tasks={filteredTasks}
        onToggle={(id, completed) => toggleTaskStatus(id, completed)}
        onDelete={removeTask}
      />
    </div>
  );
};

export default Dashboard;