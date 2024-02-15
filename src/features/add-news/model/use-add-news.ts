import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateNewsMutation } from '@/entities/news'
import { useForm } from 'react-hook-form'

const MAX_FILE_SIZE = 2000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const imageSchema = z
  .any()
  .refine((files) => files?.length >= 1, { message: 'Image is required.' })
  .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
    message: '.jpg, .jpeg, .png and .webp files are accepted.',
  })
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
    message: `Max file size is 2MB.`,
  })

const addNewsSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must contain at least 3 character(s)')
    .max(100, 'Title must contain at most 100 character(s)'),
  file: imageSchema,
})

export const useCreateNews = () => {
  const form = useForm<z.infer<typeof addNewsSchema>>({
    resolver: zodResolver(addNewsSchema),
  })

  const createMutation = useCreateNewsMutation()

  const onCreate = async (data: FormData) => {
    await createMutation.mutateAsync(data)
  }

  return {
    onCreate,
    isPending: createMutation.isPending,
    isError: createMutation.isError,
    form,
    acceptedImageTypes: ACCEPTED_IMAGE_TYPES,
    addNewsSchema,
  }
}
