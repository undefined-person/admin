import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateNewsMutation } from '@/entities/news'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const imageSchema = z.any()

const editNewsSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must contain at least 3 character(s)')
    .max(100, 'Title must contain at most 100 character(s)'),
  file: imageSchema,
})

export const useEditNews = ({ id, newsDto }: { id: number; newsDto: FormData }) => {
  const form = useForm<z.infer<typeof editNewsSchema>>({
    resolver: zodResolver(editNewsSchema),
  })

  const editMutation = useUpdateNewsMutation({ id, newsDto })

  const onEdit = () => {
    editMutation.mutate()
  }

  return {
    onEdit,
    isPending: editMutation.isPending,
    isError: editMutation.isError,
    form,
    acceptedImageTypes: ACCEPTED_IMAGE_TYPES,
    editNewsSchema,
  }
}
