import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Task } from "../types/task";


// 📌 Referencia a la colección
const tasksCollection = collection(db, "tasks");

// 🔹 Obtener tareas por usuario
export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(tasksCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const tasks: Task[] = querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Task[];

  return tasks;
};

// 🔹 Crear tarea
export const createTask = async (task: Partial<Task>) => {
  const docRef = await addDoc(tasksCollection, {
    ...task,
    completed: false,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};

// 🔹 Actualizar tarea
export const updateTask = async (
  id: string,
  updates: Partial<Task>
) => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, updates);
};

// 🔹 Eliminar tarea
export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};