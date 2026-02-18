import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

interface RichTextDisplayProps {
  content: string
}

const RichTextDisplay = ({ content }: RichTextDisplayProps) => {
  const output = useMemo(() => {
    try {
      if (!content) return ''
      const json = JSON.parse(content)
      return generateHTML(json, [
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
      ])
    } catch {
      return content
    }
  }, [content])

  return (
    <div
      className="tiptap-content text-gray-700 space-y-4 prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  )
}

export default RichTextDisplay
