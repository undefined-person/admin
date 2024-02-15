import { useNavigate } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { getEditNewsRoute } from '@/shared/types/routes.types'

type EditNewsButtonProps = {
  newsId: number
}

export const EditNewsButton = ({ newsId }: EditNewsButtonProps) => {
  const navigate = useNavigate()

  return (
    <Button className="w-full" variant="secondary" onClick={() => navigate(getEditNewsRoute(String(newsId)))}>
      Edit
    </Button>
  )
}
