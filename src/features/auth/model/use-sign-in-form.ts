import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { authControllerSignIn } from '@/shared/api/api'
import { getHomeRoute } from '@/shared/types/routes.types'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/shared/types/error.types'

const signInSchema = z.object({
  username: z.string().min(2, 'Must be at least 2 characters').max(50, 'Must contain at most 50 character(s)'),
  password: z.string().min(6, 'Must be at least 6 characters').max(50, 'Must contain at most 50 character(s)'),
})

export const useSignInForm = () => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess: () => {
      navigate(getHomeRoute())
    },
    onError: (error: AxiosError) => {
      toast({
        title: 'Error',
        description: (error.response as ErrorResponse)?.data?.message || 'Something went wrong',
      })
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    signInMutation.mutate(data)
  })

  return {
    form,
    onSubmit,
    isLoading: signInMutation.isPending,
  }
}
