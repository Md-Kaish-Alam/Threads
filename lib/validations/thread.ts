import * as z from 'zod'

export const ThredValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'At least 3 characters long.'}),
    accountId: z.string()
});


export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'At least 3 characters long comment.'}),
});

