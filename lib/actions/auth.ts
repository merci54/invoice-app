"use server";

import { connectMongoDB } from "@/lib/db/connectMongoDB";
import { User } from "@/lib/models/user";
import { Invoice } from "@/lib/models/invoice";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

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

export async function loginAsDemo() {
  const demoObjectId = new mongoose.Types.ObjectId();
  const demoUserId = demoObjectId.toString();

  const now = new Date();

  // Generate unique invoice numbers for this demo session
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randInvNum = () => {
    const l1 = letters[Math.floor(Math.random() * 26)];
    const l2 = letters[Math.floor(Math.random() * 26)];
    const nums = Math.floor(1000 + Math.random() * 9000);
    return `${l1}${l2}${nums}`;
  };

  const sampleInvoices = [
    {
      userId: demoObjectId,
      invoiceNumber: randInvNum(),
      billFrom: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      billTo: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      invoiceDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      paymentTerms: 30,
      projectDescription: "Logo Design",
      items: [
        { name: "Logo Sketches", quantity: 1, price: 500.00, total: 500.00 },
        { name: "Brand Mark", quantity: 1, price: 800.90, total: 800.90 },
        { name: "Style Guide", quantity: 1, price: 500.00, total: 500.00 },
      ],
      totalAmount: 1800.90,
      status: "Paid",
    },
    {
      userId: demoObjectId,
      invoiceNumber: randInvNum(),
      billFrom: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientName: "Alex Grim",
      clientEmail: "alexgrim@mail.com",
      billTo: {
        street: "84 Church Way",
        city: "Bradford",
        postCode: "BD1 9PB",
        country: "United Kingdom",
      },
      invoiceDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      paymentTerms: 30,
      projectDescription: "Website Redesign",
      items: [
        { name: "Website Design", quantity: 1, price: 3500.00, total: 3500.00 },
        { name: "Development", quantity: 2, price: 1000.00, total: 2000.00 },
        { name: "SEO Optimization", quantity: 1, price: 655.91, total: 655.91 },
      ],
      totalAmount: 6155.91,
      status: "Pending",
    },
    {
      userId: demoObjectId,
      invoiceNumber: randInvNum(),
      billFrom: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientName: "Alysa Werner",
      clientEmail: "alysa@email.co.uk",
      billTo: {
        street: "63 Warwick Road",
        city: "Carlisle",
        postCode: "CA20 2TG",
        country: "United Kingdom",
      },
      invoiceDate: now,
      paymentTerms: 14,
      projectDescription: "Brand Guidelines",
      items: [
        { name: "Brand Research", quantity: 1, price: 1200.00, total: 1200.00 },
        { name: "Visual Identity", quantity: 1, price: 1402.04, total: 1402.04 },
        { name: "Guidelines Doc", quantity: 1, price: 500.00, total: 500.00 },
      ],
      totalAmount: 3102.04,
      status: "Draft",
    },
  ];

  // Seeding must finish before the redirect — /invoices queries Mongo on every
  // request, so redirecting early renders an empty list until the user reloads.
  const seeding = (async () => {
    await connectMongoDB();
    await Invoice.insertMany(sampleInvoices, { ordered: false });
  })().catch((error) => {
    // A duplicate invoiceNumber shouldn't lock the user out of the demo
    console.error("⚠️ Demo seeding failed:", error);
  });

  // Session creation doesn't touch the DB, so run it alongside the seeding
  await Promise.all([
    seeding,
    createSession({
      userId: demoUserId,
      name: "Demo User",
      email: "demo@example.com",
      isDemo: true,
    }),
  ]);

  redirect("/invoices");
}

export async function logout() {
  const session = await getSession();
  const isDemo = session?.isDemo;

  await deleteSession();

  if (isDemo) {
    redirect("/");
  } else {
    redirect("/login");
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  return session;
}
