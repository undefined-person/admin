import { useMutation } from '@tanstack/react-query'

import { newsControllerUpdateNews } from '@/shared/api/api'

type NewsEditParams = {
  newsId: number
  news: FormData
}

export const useEditNews = ({ newsId, news }: NewsEditParams) => {
  const { isPending, isError, mutate } = useMutation({
    mutationFn: () => newsControllerUpdateNews(newsId, news),
  })

  return {
    onEdit: mutate,
    isPending,
    isError,
  }
}
