import { ReactNode, useState } from 'react'
import * as z from 'zod'

import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useCreateNews } from '../model/use-add-news'
import { NewsEditor } from '@/features/news-editor'

export const AddNews = () => {
  const [value, setValue] = useState('')
  const { acceptedImageTypes, addNewsSchema, form, isError, isPending, onCreate } = useCreateNews()

  const onSubmit = (data: z.infer<typeof addNewsSchema>) => {
    const formData = new FormData()
    formData.append('file', data.file[0])
    formData.append('title', data.title)
    formData.append('content', value)

    onCreate(formData)
  }

  if (isError) {
    return (
      <div>
        <h2 className="text-center">Error creating news</h2>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit" disabled={isPending}>
          Add news
        </Button>
        <Input type="text" {...form.register('title')} className="mt-4" />
        {form.formState.errors.title && <p className="text-destructive">{form.formState.errors.title.message}</p>}
        <Input
          type="file"
          {...form.register('file')}
          className="mt-4"
          accept={acceptedImageTypes.join(',')}
          multiple={false}
        />
        {form.formState.errors.file && (
          <p className="text-destructive">{form.formState.errors.file.message as ReactNode}</p>
        )}
        <NewsEditor value={value} setValue={setValue} />
      </form>
    </Form>
  )
}
