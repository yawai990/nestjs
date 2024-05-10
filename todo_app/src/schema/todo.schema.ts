import z from 'zod';

export const todoCreateSchema = z.object({
  todo: z.string({
    required_error: 'what you wanna do?',
  }),
});

export const todoParamsSchema = z.object({
  id: z.number(),
});
