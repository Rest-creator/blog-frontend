
import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { EditorToolbar } from './EditorToolbar';
import { debounce } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Initialize lowlight with common languages
const lowlight = createLowlight(common);

export function Editor() {
  const [content, setContent] = useState<string>(
    localStorage.getItem('editor-content') || '<p>Start writing your article...</p>'
  );
  const { toast } = useToast();

  // Save to localStorage with debounce
  const saveContent = useCallback(
    debounce((newContent: string) => {
      localStorage.setItem('editor-content', newContent);
      toast({
        title: "Changes saved",
        description: "Your content has been saved to local storage",
        variant: "default",
        duration: 2000,
      });
    }, 1000),
    [toast]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      saveContent(newContent);
    },
    editorProps: {
      attributes: {
        class: 'prose-sm sm:prose-base lg:prose-lg dark:prose-invert focus:outline-none min-h-[500px] max-w-none',
      },
    },
  });

  // Handle drag and drop for images
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      if (!editor) return;
      
      event.preventDefault();
      
      if (event.dataTransfer?.files?.length) {
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (readerEvent) => {
            if (typeof readerEvent.target?.result === 'string') {
              editor.chain().focus().setImage({ src: readerEvent.target.result }).run();
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };

    // Add event listeners for drag and drop
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', (e) => e.preventDefault());
    };
  }, [editor]);

  return (
    <div className="border rounded-lg bg-card">
      {editor && <EditorToolbar editor={editor} />}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
