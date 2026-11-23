import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`px-2 py-1 rounded-md text-xs font-semibold transition cursor-pointer select-none ${
      active
        ? 'bg-indigo-600 text-white shadow-xs'
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);

const TiptapEditor = ({
  content = '',
  onChange,
  placeholder = "What are you creating on Zeno...?",
  minHeight = 'min-h-[110px]',
  showToolbar = true,
  onEditorReady
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-full bg-transparent focus:outline-hidden ${minHeight} p-1`,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      if (onChange) {
        onChange({
          html: currentEditor.getHTML(),
          text: currentEditor.getText(),
          isEmpty: currentEditor.isEmpty,
          editor: currentEditor,
        });
      }
    },
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return (
      <div className={`w-full ${minHeight} bg-zinc-900/30 rounded-xl animate-pulse p-4 text-xs text-zinc-500`}>
        Loading editor...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 min-w-0">
      {/* Rich Text Toolbar */}
      {showToolbar && (
        <div className="flex items-center gap-1 flex-wrap p-1.5 rounded-xl bg-zinc-800/40 border border-white/5 text-xs">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            B
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <em>I</em>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <s>S</s>
          </ToolbarButton>

          <div className="w-px h-4 bg-white/10 mx-0.5" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            H2
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            • List
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            1. List
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Quote"
          >
            &ldquo; Quote
          </ToolbarButton>

          <div className="w-px h-4 bg-white/10 mx-0.5" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >
            &lt;/&gt;
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            {`{ }`}
          </ToolbarButton>

          <div className="w-px h-4 bg-white/10 mx-0.5 ml-auto hidden sm:block" />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            ↺
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            ↻
          </ToolbarButton>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="min-w-0 w-full overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
