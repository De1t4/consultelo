import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'

export default function EditorText({ body, setValue }: { body: string, setValue: (value: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: (() => {
      try {
        return JSON.parse(body)
      } catch {
        return body || ''
      }
    })(),
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[150px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      setValue(JSON.stringify(editor.getJSON()))
    },
    immediatelyRender: false,
  })

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[200px] cursor-text"
      />
    </div>
  )
}
