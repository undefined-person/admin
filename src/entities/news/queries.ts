import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  NewsListParams,
  newsControllerCreateNews,
  newsControllerDeleteNews,
  newsControllerGetNews,
  newsControllerGetNewsById,
  newsControllerUpdateNews,
} from '@/shared/api/api'
import { getPreviewNewsRoute } from '@/shared/types/routes.types'

const newsKey = ['news']

export function useGetNewsQuery({ limit, page }: NewsListParams) {
  return useQuery({
    queryKey: ['news', limit, page],
    queryFn: () =>
      newsControllerGetNews({
        limit,
        page,
      }),
  })
}

export function useDeleteNewsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: newsControllerDeleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsKey,
      })
    },
  })
}

export function useCreateNewsMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: newsControllerCreateNews,
    onSuccess: (data) => {
      navigate(getPreviewNewsRoute(String(data.news.id)))
    },
  })
}

export function useGetNewsByIdQuery(newsId: number) {
  return useQuery({
    queryKey: ['news', newsId],
    queryFn: () => newsControllerGetNewsById(newsId),
  })
}

export function useUpdateNewsMutation({ id, newsDto }: { id: number; newsDto: FormData }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => newsControllerUpdateNews(id, newsDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsKey,
      })
    },
  })
}
