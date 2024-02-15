import { useGetNewsByIdQuery } from '@/entities/news'

export const useGetNewsById = ({ id }: { id: number }) => {
  const getNewsByIdQuery = useGetNewsByIdQuery(id)

  const newsInfo = getNewsByIdQuery.data

  return { newsInfo, isPending: getNewsByIdQuery.isLoading, isError: getNewsByIdQuery.isError }
}
