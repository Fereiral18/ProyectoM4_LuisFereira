import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  orderBy,
  type DocumentData,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import type { Task } from "../types/task";

const tasksCollection = collection(db, "tasks");

// 🔥 CREATE TASK
export const createTask = async (
  task: Omit<Task, "id" | "createdAt">
) => {
  if (!task.userId) {
    throw new Error("userId es obligatorio para crear una tarea");
  }

  const payload = {
    title: task.title,
    description: task.description ?? "",
    dueDate: task.dueDate ?? "",
    userId: task.userId,
    completed: task.completed ?? false,
    createdAt: Date.now(),
    index: task.index ?? 0,
  };

  return await addDoc(tasksCollection, payload);
};

// 🔥 GET TASKS BY USER (opcional si usas onSnapshot)
export const getTasksByUser = async (userId: string): Promise<Task[]> => {
  const q = query(
    tasksCollection,
    where("userId", "==", userId),
    orderBy("index", "asc")
  );
 
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as DocumentData;

    return {
      id: docSnap.id,
      title: data.title ?? "",
      description: data.description ?? "",
      dueDate: data.dueDate ?? "",
      userId: data.userId ?? "",
      completed: data.completed ?? false,
      createdAt: data.createdAt ?? 0,
      index: data.index ?? 0,
    };
  });
};

// 🔥 UPDATE TASK
export const updateTask = async (
  taskId: string,
  data: Partial<Task>
) => {
  const taskRef = doc(db, "tasks", taskId);
  return await updateDoc(taskRef, data);
};

// 🔥 REORDER TASKS
export const updateTasksOrder = async (sortedTasks: Task[]) => {
  const batch = writeBatch(db);

  sortedTasks.forEach((task, idx) => {
    const taskRef = doc(db, "tasks", task.id);
    batch.update(taskRef, { index: idx });
  });

  return await batch.commit();
};

// 🔥 DELETE TASK
export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  return await deleteDoc(taskRef);
};