import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import * as z from 'zod'
import { AxiosError } from 'axios'

import { userControllerAddUser } from '@/shared/api/api'
import { useToast } from '@/shared/hooks/use-toast'
import { ErrorResponse } from '@/shared/types/error.types'

const addUserSchema = z.object({
  username: z.string().min(2, 'Must be at least 2 characters').max(50, 'Must contain at most 50 character(s)'),
  password: z.string().min(6, 'Must be at least 6 characters').max(50, 'Must contain at most 50 character(s)'),
})

export const useAddUserForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const addUserMutation = useMutation({
    mutationFn: userControllerAddUser,
    onSuccess: () => {
      form.reset()
      toast({
        title: 'User added',
        description: 'User has been added successfully',
      })
    },
    onError: (error: AxiosError) => {
      toast({
        title: 'Error',
        description: (error.response as ErrorResponse)?.data?.message || 'Something went wrong',
      })
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    addUserMutation.mutate(data)
  })

  return {
    form,
    onSubmit,
    isLoading: addUserMutation.isPending,
  }
}
