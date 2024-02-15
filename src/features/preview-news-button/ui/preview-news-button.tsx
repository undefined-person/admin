import { useNavigate } from 'react-router-dom'

import { Button } from '@/shared/ui/button'
import { getPreviewNewsRoute } from '@/shared/types/routes.types'
import { cn } from '@/shared/lib/utils'

export const PreviewNewsButton = ({ className, newsId }: { className?: string; newsId: number }) => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(getPreviewNewsRoute(String(newsId)))} className={cn(className, 'w-full')}>
      Preview news
    </Button>
  )
}
