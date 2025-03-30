import { users, onboardingProgress, type User, type InsertUser, type OnboardingProgress, type InsertOnboardingProgress } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getOnboardingProgress(userId: number): Promise<OnboardingProgress | undefined>;
  createOnboardingProgress(progress: InsertOnboardingProgress): Promise<OnboardingProgress>;
  updateOnboardingProgress(userId: number, moduleField: string, progress: number): Promise<OnboardingProgress>;
  updateUserOnboardingStatus(userId: number, completed: boolean): Promise<User>;
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private onboardingProgress: Map<number, OnboardingProgress>;
  currentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.onboardingProgress = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      onboardingCompleted: false 
    };
    this.users.set(id, user);
    return user;
  }

  async getOnboardingProgress(userId: number): Promise<OnboardingProgress | undefined> {
    return Array.from(this.onboardingProgress.values()).find(
      (progress) => progress.userId === userId,
    );
  }

  async createOnboardingProgress(insertProgress: InsertOnboardingProgress): Promise<OnboardingProgress> {
    const id = this.currentId++;
    const progress: OnboardingProgress = { ...insertProgress, id };
    this.onboardingProgress.set(id, progress);
    return progress;
  }

  async updateOnboardingProgress(userId: number, moduleField: string, progress: number): Promise<OnboardingProgress> {
    const userProgress = await this.getOnboardingProgress(userId);
    
    if (!userProgress) {
      throw new Error("Onboarding progress not found");
    }

    const updatedProgress = {
      ...userProgress,
      [moduleField]: progress,
    };

    this.onboardingProgress.set(userProgress.id, updatedProgress);
    return updatedProgress;
  }

  async updateUserOnboardingStatus(userId: number, completed: boolean): Promise<User> {
    const user = await this.getUser(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = {
      ...user,
      onboardingCompleted: completed,
    };

    this.users.set(userId, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
