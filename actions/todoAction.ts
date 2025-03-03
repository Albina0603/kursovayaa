"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { todo } from "@/db/schema";
import { auth } from "@/auth";

async function getUserEmail() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User must be authenticated to perform this action");
  }
  return session.user.email;
}

export const getData = async () => {
  const userEmail = await getUserEmail();
  const data = await db.select().from(todo).where(eq(todo.email, userEmail));
  return data;
};

export const addTodo = async (id: string, text: string) => {
  // Change to string

  const userEmail = await getUserEmail();
  await db.insert(todo).values({
    id,
    text,
    email: userEmail,
    completed: false,
  });
  revalidatePath("/dashboard");
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