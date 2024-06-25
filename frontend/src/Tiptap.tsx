import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import emojiSuggestion from './suggestion';
import Placeholder from '@tiptap/extension-placeholder';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import './style.scss';
import { ItalicIcon, BoldIcon, HeadIcon } from './Icon';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';

interface TiptapProps {
  initialTitle: string;
  initialContent: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap: React.FC<TiptapProps> = ({ initialTitle, initialContent, onTitleChange, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      Blockquote,
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      CodeBlock,
      TextStyle,
      Highlight,
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
        // @ts-ignore
        suggestion: emojiSuggestion,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Title';
          }
          return 'Tell your story...';
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'code-block',
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: `<h1>${initialTitle}</h1>${initialContent}`,
    editorProps: {
      attributes: {
        class: 'min-h-[400px] min-w-[820px] text-gray-800 max-w-[820px] focus:outline-none focus:ring focus:ring-white font-rome text-xl',
      },
    },
    onUpdate({ editor }) {
      const content = editor.getHTML();
      const titleMatch = content.match(/<h1.*?>(.*?)<\/h1>/);
      const title = titleMatch ? titleMatch[1] : '';
      const restContent = content.replace(/<h1.*?>.*?<\/h1>/, '').trim();

      onTitleChange(title);
      onContentChange(restContent);
    },
  });

  useEffect(() => {
    if (editor) {
      const updateActiveState = () => {
        const titleElement = editor.view.dom.querySelector('h1:first-child');
        if (titleElement) {
          if (editor.isActive('heading', { level: 1 })) {
            titleElement.classList.add('is-active-title');
          } else {
            titleElement.classList.remove('is-active-title');
          }
        }
      };

      editor.on('selectionUpdate', updateActiveState);
      editor.on('focus', updateActiveState);
      editor.on('blur', updateActiveState);

      return () => {
        editor.off('selectionUpdate', updateActiveState);
        editor.off('focus', updateActiveState);
        editor.off('blur', updateActiveState);
      };
    }
  }, [editor]);

  return (
    <div className="flex justify-normal">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu bg-zinc-800 text-gray-100 rounded">
            <div className="px-2 py-1">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                <BoldIcon />
              </button>
            </div>

            <div className="px-2 py-1">
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                <ItalicIcon />
              </button>
            </div>

            <div className="px-2 py-1">
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
              >
                <HeadIcon />
              </button>
            </div>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
