import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSessionQuery } from '@/entities/session'
import { getHomeRoute, getSignInRoute } from '@/shared/types/routes.types'
import { PageSpinner } from '@/shared/ui/page-spinner'

export function ProtectedRoute({ children, isAdminRoute }: { children: ReactNode; isAdminRoute?: boolean }) {
  const navigate = useNavigate()
  const { isPending, isError, data } = useSessionQuery()

  if (isPending) {
    return <PageSpinner />
  }

  if (isError) {
    navigate(getSignInRoute())
  }

  if (isAdminRoute) {
    if (data?.session.role !== 'ADMIN') {
      navigate(getHomeRoute())
    }
  }

  return <>{children}</>
}
