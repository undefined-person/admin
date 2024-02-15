import { ReactNode, useEffect, useState } from 'react'
import * as z from 'zod'
import { useParams } from 'react-router-dom'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useEditNews } from '../model/use-edit-news'
import { NewsEditor } from '@/features/news-editor'
import { useGetNewsById } from '@/features/preview-news'
import { PageSpinner } from '@/shared/ui/page-spinner'
import { getImage } from '@/shared/lib/getImage'

export const EditNews = () => {
  const { id } = useParams()
  const { newsInfo } = useGetNewsById({
    id: Number(id),
  })

  const [value, setValue] = useState('')
  const [data, setData] = useState<FormData>(new FormData())

  const { acceptedImageTypes, editNewsSchema, form, isError, isPending, onEdit } = useEditNews({
    id: Number(id),
    newsDto: data,
  })

  const onSubmit = (data: z.infer<typeof editNewsSchema>) => {
    const formData = new FormData()
    formData.append('file', data.file.length > 0 ? data.file[0] : newsInfo!.newsCoverPhoto)
    formData.append('title', data.title)
    formData.append('content', value)

    setData(formData)
    onEdit()
  }

  useEffect(() => {
    setValue(newsInfo?.content ?? '')
  }, [newsInfo?.content])

  if (isPending) {
    return <PageSpinner />
  }

  if (isError) {
    return (
      <div>
        <h2 className="text-center">Error editing news</h2>
      </div>
    )
  }

  if (!newsInfo) {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit" disabled={isPending}>
          Edit news
        </Button>
        <Input type="text" {...form.register('title')} defaultValue={newsInfo.title} className="mt-4" />
        {form.formState.errors.title && <p className="text-destructive">{form.formState.errors.title.message}</p>}
        <img src={getImage(newsInfo.newsCoverPhoto)} alt={newsInfo.title} className="w-40 h-32 mt-4 rounded-lg" />
        <p className="mt-4">Change cover photo</p>
        <Input type="file" {...form.register('file')} accept={acceptedImageTypes.join(',')} multiple={false} />
        {form.formState.errors.file && (
          <p className="text-destructive">{form.formState.errors.file.message as ReactNode}</p>
        )}
        <NewsEditor value={value} setValue={setValue} />
      </form>
    </Form>
  )
}
