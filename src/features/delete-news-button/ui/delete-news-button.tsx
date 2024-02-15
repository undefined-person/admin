import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { buttonVariants } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useDeleteNews } from '../model/use-delete-news'

type DeleteNewsButtonProps = {
  newsId: number
}

export const DeleteNewsButton = ({ newsId }: DeleteNewsButtonProps) => {
  const { isError, isPending, onDelete } = useDeleteNews(newsId)

  if (isError) {
    return <div>Error deleting news</div>
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isPending}
        className={cn(
          buttonVariants({
            variant: 'destructive',
          }),
          'w-full'
        )}>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the news.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
