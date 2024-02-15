import { useGetNewsList } from '../model/use-get-news-list'
import { getImage } from '@/shared/lib/getImage'
import { EditNewsButton } from '@/features/edit-news-button'
import { DeleteNewsButton } from '@/features/delete-news-button'
import { PreviewNewsButton } from '@/features/preview-news-button'
import { PageSpinner } from '@/shared/ui/page-spinner'
import { Button } from '@/shared/ui/button'

export function NewsList() {
  const { hasNextPage, hasPreviousPage, isError, isPending, items, page, setPage } = useGetNewsList()

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

  if (!items?.length) {
    return (
      <div>
        <h2 className="text-center">No news found</h2>
      </div>
    )
  }

  return (
    <>
      {items.map((item) => (
        <div
          className="grid grid-cols-[160px_1fr_200px] gap-4 p-4 border rounded-lg mt-4 h-44 overflow-hidden"
          key={item.id}>
          <img src={getImage(item.newsCoverPhoto)} alt={item.title} className="w-40 h-32 rounded-lg" />
          <div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: item.content }} className="text-gray-500" />
          </div>
          <div className="space-y-2">
            <PreviewNewsButton newsId={item.id} />
            <EditNewsButton newsId={item.id} />
            <DeleteNewsButton newsId={item.id} />
          </div>
        </div>
      ))}
      <div className="flex justify-center gap-4 mt-4">
        <Button disabled={!hasPreviousPage} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </>
  )
}
