import { useMutation } from '@tanstack/react-query'

import { useResetSession } from '@/entities/session/queries'
import { authControllerSignOut } from '@/shared/api/api'
import { useNavigate } from 'react-router-dom'
import { getSignInRoute } from '@/shared/types/routes.types'

export const useSignOut = () => {
  const navigate = useNavigate()
  const resetSession = useResetSession()

  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    onSuccess: () => {
      navigate(getSignInRoute())
      resetSession()
    },
  })

  return {
    signOut: signOutMutation.mutate,
    isLoading: signOutMutation.isPending,
  }
}
