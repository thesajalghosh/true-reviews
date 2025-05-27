import {z} from 'zod'


export const verifySchema = z.object({
    code : z.string().min(6, {message: "message mush be in 6 chracter"})
})