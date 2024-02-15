import { Button } from '@/shared/ui/button'
import { useAddNews } from '../model/use-add-news'

export const AddNewsButton = ({ className }: { className?: string }) => {
  const { onAdd } = useAddNews()

  return (
    <Button onClick={onAdd} className={className}>
      Add news
    </Button>
  )
}
