import { z } from "zod";

export const UserUpdateSchema = z.object({
    names: z.string().optional(),
    username: z.string().optional(),
});

export const UserChangePasswordSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
});