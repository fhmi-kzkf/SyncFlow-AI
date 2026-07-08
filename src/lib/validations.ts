import { z } from "zod";

export const formInputSchema = z.object({
  idea: z.string().min(10, "Idea must be at least 10 characters").max(5000, "Idea is too long (max 5000 chars)"),
  targetUser: z.string().min(2, "Target user required").max(200, "Target user is too long"),
  features: z.array(z.string().max(100)).max(20, "Too many features (max 20)"),
  stack: z.string().max(300, "Stack description too long"),
  scale: z.enum(["small", "medium", "large", "enterprise"]).default("small"),
});

export const answersSchema = z.object({
  answers: z.array(z.string().max(5000, "Answer too long")).max(5, "Too many answers"),
});
