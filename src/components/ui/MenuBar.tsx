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
    <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 dark:bg-background border-b border-border">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('bold') ? 'dark:bg-neutral-700 bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600 dark:hover:bg-neutral-700'
          }`}
        title="Bold"
      >
        <Bold className="h-4 w-4 dark:text-gray-300" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('italic') ? 'dark:bg-neutral-700 bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600 dark:hover:bg-neutral-700'
          }`}
        title="Italic"
      >
        <Italic className="h-4 w-4 dark:text-gray-300" />
      </button>

      <div className="h-6 w-px bg-gray-300 mx-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('bulletList') ? 'dark:bg-neutral-700 bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600 dark:hover:bg-neutral-700'
          }`}
        title="Bullet List"
      >
        <List className="h-4 w-4 dark:text-gray-300" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded transition-colors ${editor.isActive('orderedList') ? 'dark:bg-neutral-700 bg-gray-200 text-gray-900' : 'hover:bg-gray-200 text-gray-600 dark:hover:bg-neutral-700'
          }`}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4 dark:text-gray-300" />
      </button>
    </div>
  )
}

export default MenuBar
