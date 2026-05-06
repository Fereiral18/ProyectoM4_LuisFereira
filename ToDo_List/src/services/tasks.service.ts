import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Task } from "../types/task";

const tasksCollection = collection(db, "tasks");

// 🔹 Obtener tareas por usuario
export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(tasksCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: data.title ?? "",
      description: data.description ?? "",
      completed: data.completed ?? false,
      createdAt: data.createdAt,
      userId: data.userId,
    } as Task;
  });
};

// 🔹 Crear tarea
export const createTask = async (
  task: Pick<Task, "title" | "description" | "userId">
) => {
  const docRef = await addDoc(tasksCollection, {
    title: task.title,
    description: task.description ?? "",
    completed: false,
    userId: task.userId,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

// 🔹 Actualizar tarea (más seguro)
export const updateTask = async (
  id: string,
  updates: Partial<Pick<Task, "title" | "description" | "completed">>
) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, updates);
};

// 🔹 Eliminar tarea
export const deleteTask = async (id: string) => {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
};