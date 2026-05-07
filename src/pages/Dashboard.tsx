import { useState } from "react";
import type { TaskFilter } from "../types/task";

import { useAuth } from "../context/AuthContext";
import TaskList from "../components/tasks/TaskList";
import { TaskForm } from "../components/tasks/TaskForm";
import { useTasks } from "../hooks/useTask";
import { auth } from "../lib/firebase";


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
   const [sendingEmail, setSendingEmail] = useState(false);
if (!user?.uid) return;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No autorizado</p>;
 const handleSendEmail = async () => {
    if (tasks.length === 0) return alert("No tienes tareas para enviar.");

    setSendingEmail(true);
    try {
      const response = await fetch("/api/send_email", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        tasks,
        userEmail:auth.currentUser?.email,
    }),
});
      if (response.ok) {
        alert("✅ Resumen enviado con éxito a tu correo.");
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error al enviar email:", error);
      alert("❌ No se pudo enviar el email.");
    } finally {
      setSendingEmail(false);
    }
  };

 
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
    <button
            onClick={handleSendEmail}
            disabled={sendingEmail}
            >
            {sendingEmail ? "Enviando..." : "📧 Enviar Resumen por Email"}
          </button>
            </div>
  );
};

export default Dashboard;