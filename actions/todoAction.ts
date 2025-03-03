"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { todo } from "@/db/schema";



export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

export const addTodoTodo = async (id: number, text: string, user:string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
    user:user,
  });
};
export const addTodo = async (id: number, text: string, userEmail: string | undefined) => {
  if (!userEmail) {
    throw new Error('User email is required');
  }

  await db.insert(todo).values({
    id: id,
    text: text,
    user: userEmail, // Save the user email in the database
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/dashboard");
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      completed: not(todo.completed),
    })
    .where(eq(todo.id, id));

  revalidatePath("/dashboard");
};

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));

  revalidatePath("/dashboard");
};

