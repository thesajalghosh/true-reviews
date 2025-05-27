import {z} from 'zod'


export const signInSchema = z.object({
  identyfire: z.string(),
  password: z.string(),
})