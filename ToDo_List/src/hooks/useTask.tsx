import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  type DocumentData,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, loading: authLoading } = useAuth();

useEffect(() => {
  if (authLoading) return;

if (!user?.uid) {
  setTasks([]);
  setLoading(false);
  return;
}

  setLoading(true);
  setError(null);

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data: Task[] = snapshot.docs.map((doc) => {
        const raw = doc.data() as DocumentData;

        return {
          id: doc.id,
          title: raw.title ?? "",
          description: raw.description ?? "",
          dueDate: raw.dueDate ?? "",
          completed: raw.completed ?? false,
          userId: raw.userId ?? "",
          createdAt: raw.createdAt ?? 0,
          index: raw.index ?? 0,
        };
      });

      setTasks(data);
      setLoading(false);
    },
    (err) => {
      console.error(err);
      setError("Error al conectar con Firebase");
      setLoading(false);
    }
  );

  // 🔥 SIEMPRE devolver cleanup
  return () => unsubscribe();
}, [user?.uid, authLoading]);
  // 🔥 CLAVE
  // 🔥 CREATE
  const addTask = async (
    title: string,
    description: string,
    dueDate: string
  ) => {
    if (!user) return;

    setError(null);

    try {
      await createTask({
        title,
        description,
        dueDate,
        userId: user.uid,
        completed: false,
      });
    } catch {
      setError("No se pudo crear la tarea");
    }
  };

  // 🔥 TOGGLE (simplificado)
const toggleTaskStatus = async (id: string, completed: boolean) => {
  await updateTask(id, {
    completed: !completed,
  });
};

  // 🔥 DELETE
  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch {
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