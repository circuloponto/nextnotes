import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import './RichTextEditor.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 mb-2 border-b border-input bg-secondary/20 rounded-t-md">
      <motion.button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${editor.isActive('bold') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${editor.isActive('italic') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Italic"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="4" x2="10" y2="4"></line>
          <line x1="14" y1="20" x2="5" y2="20"></line>
          <line x1="15" y1="4" x2="9" y2="20"></line>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded ${editor.isActive('strike') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Strikethrough"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="12" x2="6" y2="12"></line>
          <path d="M8 7a4 4 0 0 1 8 0"></path>
          <path d="M8 17a4 4 0 0 0 8 0"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1 rounded ${editor.isActive('code') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Code"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </motion.button>
      <div className="w-px h-6 bg-border mx-1"></div>
      <motion.button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Heading 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16"></path>
          <path d="M4 6h8"></path>
          <path d="M4 18h8"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Heading 2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h10"></path>
          <path d="M4 6h16"></path>
          <path d="M4 18h16"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Heading 3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h8"></path>
          <path d="M4 6h16"></path>
          <path d="M4 18h16"></path>
        </svg>
      </motion.button>
      <div className="w-px h-6 bg-border mx-1"></div>
      <motion.button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Bullet List"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Ordered List"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" y1="6" x2="21" y2="6"></line>
          <line x1="10" y1="12" x2="21" y2="12"></line>
          <line x1="10" y1="18" x2="21" y2="18"></line>
          <path d="M4 6h1v4"></path>
          <path d="M4 10h2"></path>
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded ${editor.isActive('blockquote') ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Blockquote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 10h2a2 2 0 0 1 2 2v5H6v-5a2 2 0 0 1 2-2z"></path>
          <path d="M15 10h2a2 2 0 0 1 2 2v5h-4v-5a2 2 0 0 1 2-2z"></path>
        </svg>
      </motion.button>
      <div className="w-px h-6 bg-border mx-1"></div>
      <motion.button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1 rounded hover:bg-secondary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Undo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7v6h6"></path>
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
        </svg>
      </motion.button>
      <motion.button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1 rounded hover:bg-secondary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Redo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 7v6h-6"></path>
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
        </svg>
      </motion.button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange, rows = 20, isMobile = false }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({
        target: {
          id: 'content',
          value: html
        }
      });
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <motion.div 
      className="w-full flex-1 border border-input rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className={`px-3 py-2 overflow-y-auto ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}
      />
    </motion.div>
  );
};

export default RichTextEditor;
