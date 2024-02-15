import { useParams } from 'react-router-dom'

import { useGetNewsById } from '../model/use-get-news-by-id'
import { getImage } from '@/shared/lib/getImage'
import { PageSpinner } from '@/shared/ui/page-spinner'

export const PreviewNews = () => {
  const { id } = useParams()
  const { newsInfo, isError, isPending } = useGetNewsById({ id: Number(id) })

  if (isPending) {
    return <PageSpinner />
  }

  if (isError) {
    return (
      <div>
        <h2 className="text-center">Error fetching news</h2>
      </div>
    )
  }

  if (!newsInfo) {
    return (
      <div>
        <h2 className="text-center">No news found</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-4">
        <img src={getImage(newsInfo.newsCoverPhoto)} alt={newsInfo.title} className="w-40 h-32 rounded-lg" />
        <div>
          <h2 className="text-xl">{newsInfo.title}</h2>
          <span>{new Date(newsInfo.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: newsInfo.content }} className="mt-2" />
    </div>
  )
}
