import { useSessionQuery } from '@/entities/session'

export const useIsAdmin = () => {
  const { data } = useSessionQuery()

  return data?.session.role === 'ADMIN'
}
