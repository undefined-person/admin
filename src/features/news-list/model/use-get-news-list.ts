import { useState } from 'react'

import { useGetNewsQuery } from '@/entities/news'

export const useGetNewsList = () => {
  const [page, setPage] = useState(1)
  const limit = 10

  const newsListQuery = useGetNewsQuery({ limit, page })

  const items = newsListQuery.data?.news

  return {
    items,
    page,
    setPage,
    hasNextPage: newsListQuery.data?.hasMore ?? false,
    hasPreviousPage: newsListQuery.data?.hasPrevious ?? false,
    isPending: newsListQuery.isPending,
    isError: newsListQuery.isError,
  }
}
