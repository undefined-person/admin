import { useDeleteNewsMutation } from '@/entities/news'

export const useDeleteNews = (newsId: number) => {
  const deleteMutation = useDeleteNewsMutation()

  const onDelete = async () => {
    await deleteMutation.mutateAsync(newsId)
  }

  return {
    onDelete,
    isPending: deleteMutation.isPending,
    isError: deleteMutation.isError,
  }
}
