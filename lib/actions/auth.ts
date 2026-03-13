"use server";

import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { User } from "@/lib/models/user";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export interface AuthResult {
  error?: string;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  await connectMongoDB();

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return { error: "User with this email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  await createSession({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  redirect("/invoices");
}

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  await connectMongoDB();

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  await createSession({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  redirect("/invoices");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getCurrentUser() {
  const session = await getSession();
  return session;
}
