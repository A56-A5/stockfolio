import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
});

export const onboardingProgress = pgTable("onboarding_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  module1Progress: integer("module1_progress").notNull().default(0),
  module2Progress: integer("module2_progress").notNull().default(0),
  module3Progress: integer("module3_progress").notNull().default(0),
  module4Progress: integer("module4_progress").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  onboardingCompleted: true,
});

export const insertOnboardingProgressSchema = createInsertSchema(onboardingProgress).omit({
  id: true,
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateOnboardingProgressSchema = z.object({
  module: z.enum(["module1Progress", "module2Progress", "module3Progress", "module4Progress"]),
  progress: z.number().min(0).max(10),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type OnboardingProgress = typeof onboardingProgress.$inferSelect;
export type InsertOnboardingProgress = z.infer<typeof insertOnboardingProgressSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type UpdateOnboardingProgress = z.infer<typeof updateOnboardingProgressSchema>;
