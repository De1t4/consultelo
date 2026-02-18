'use client'

import { Editor } from '@tiptap/react'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'

interface MenuBarProps {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600'
          }`}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600'
          }`}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </button>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600'
          }`}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600'
          }`}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </button>
    </div>
  )
}

export default MenuBar
