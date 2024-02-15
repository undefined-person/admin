import { Link } from 'react-router-dom'

import { AddNewsButton } from '@/features/add-news-button'
import { getAddUserRoute, getHomeRoute } from '@/shared/types/routes.types'
import { SignOutButton } from '@/features/auth'
import { useIsAdmin } from '@/shared/hooks/use-is-admin'

export function Header() {
  const isAdmin = useIsAdmin()
  return (
    <header className="container flex items-center justify-between py-8 mx-auto">
      <div className="space-x-4">
        <Link to={getHomeRoute()}>Home</Link>
        <AddNewsButton />
        {isAdmin && <Link to={getAddUserRoute()}>Add User</Link>}
      </div>
      <SignOutButton />
    </header>
  )
}
