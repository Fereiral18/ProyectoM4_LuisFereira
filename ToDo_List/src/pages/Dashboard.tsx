import { useEffect, useState } from "react";
import type { Task, TaskFilter } from "../types/task";

import { useAuth } from "../context/AuthContext";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import { getTasks } from "../services/tasks.service";

const Dashboard = () => {
  const { user, loading } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);
console.log(tasks)
  // 🔹 Persistencia del filtro
  useEffect(() => {
    const savedFilter = localStorage.getItem("filter") as TaskFilter;
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // 🔹 Cargar tareas
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true);

        const data = await getTasks(user.uid);
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar tareas");
      } finally {
        setIsLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [user]);

  // 🔹 Filtro de tareas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // 🔹 Estados globales
  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No autorizado</p>;

  return (
    <div className="container">
      <h1>Mis tareas</h1>

      {/* 🧾 FORMULARIO (ANTES FALTABA) */}
      <TaskForm
        onTaskCreated={async () => {
          try {
            const data = await getTasks(user.uid);
            setTasks(data);
          } catch (err) {
            console.error(err);
          }
        }}
      />

      {/* 🔘 FILTROS */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completadas
        </button>

        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pendientes
        </button>
      </div>

      {/* ⏳ ESTADOS */}
      {isLoadingTasks && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📋 LISTA */}
      {!isLoadingTasks && !error && (
        <TaskList tasks={filteredTasks} />
      )}
    </div>
  );
};

export default Dashboard;