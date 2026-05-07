import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,

} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/task";
import { db } from "../lib/firebase";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../services/tasks.service";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("index", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];

      // 3. Ordenamos por el campo index (importante para mantener tu orden manual)
      const sortedData = data.sort((a, b) => (a.index || 0) - (b.index || 0));
      
      setTasks(sortedData);
      setLoading(false);
    },
      (err) => {
        console.error(err);
        setError("Error al conectar con Firebase");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // 🔥 CREATE
  const addTask = async (
    title: string,
    description: string,
    dueDate: string
  ) => {
    if (!user?.uid) return;
console.log("CREANDO TASK con user:", user.uid); // 👈 AQUÍ

    try {
      await createTask({
        title,
        description,
        dueDate,
        userId: user.uid,
        completed: false,
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la tarea");
    }
  };

  // 🔥 TOGGLE
  const toggleTaskStatus = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, {
        completed: !completed,
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la tarea");
    }
  };

  // 🔥 DELETE
  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la tarea");
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTaskStatus,
    removeTask,
  };
};