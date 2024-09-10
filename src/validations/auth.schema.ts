import { z } from "zod";

export const UserSignInSchema = z.object({
  body: z.object({
    username: z
      .string({ message: "El nombre de usuario es requerido" })
      .min(1, {
        message: "El nombre de usuario es requerido",
      }),
    password: z.string({ message: "La contraseña es requerida" }).min(1, {
      message: "La contraseña es requerida",
    }),
  }),
});

const passwordBasicSchema = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .refine(
    (value) => {
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSymbols = /[!@#$%^&*()_+-=[\]{};':"\|,.<>/ ?]+/.test(value);
      if (hasUpper && hasLower && hasNumber && hasSymbols) {
        return true;
      }
      return false;
    },
    {
      message:
        "La contraseña debe tener al menos una mayúscula, una minúscula y un símbolo",
    }
  );

export const UserSignUpSchema = z.object({
  body: z
    .object({
      names: z.string().min(1, {
        message: "Los nombres son requeridos",
      }),
      username: z.string().min(1, {
        message: "El nombre de usuario es requerido",
      }),
      password: passwordBasicSchema,
      repeatPassword: passwordBasicSchema,
    })
    .refine(
      (values) => {
        if (values.password !== values.repeatPassword) {
          return false;
        }
        return true;
      },
      {
        path: ["password"],
        message: "Las contraseñas no coinciden",
      }
    ),
});
