import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['link', 'image'],
  ],
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'size',
  'video',
  'align',
  'background',
  'direction',
  'code-block',
  'code',
]

export function NewsEditor({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} className="mt-4" />
  )
}
