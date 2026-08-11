'use client'

import { useRef, useCallback } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
}

export default function RichTextEditor({ value, onChange, height = 500 }: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorChange = useCallback((content: string) => {
    onChange(content)
  }, [onChange])

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'e2vregx3w08lxuw0zzpkiu6eoziywrdgqk0ylso9f3yuch9n'}
      onInit={(evt: any, editor: any) => editorRef.current = editor}
      value={value}
      onEditorChange={handleEditorChange}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
          'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking'
        ],
        toolbar: 'undo redo | blocks | bold italic underline strikethrough | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help | ' +
          'link image media table | code codesample | ' +
          'forecolor backcolor | emoticons charmap | fullscreen preview',
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.6; }',
        branding: false,
        promotion: false,
        statusbar: true,
        resize: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        images_upload_handler: async (blobInfo: any) => {
          const formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData })
            if (response.ok) {
              const data = await response.json()
              return data.url
            }
            throw new Error('Upload failed')
          } catch (error) {
            throw error
          }
        },
        setup: (editor: any) => {
          editor.on('change', () => {
            onChange(editor.getContent())
          })
          editor.on('init', () => {
            editor.getContainer().addEventListener('click', (e: Event) => e.stopPropagation())
          })
        }
      }}
    />
  )
}
