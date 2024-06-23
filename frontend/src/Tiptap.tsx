import React from 'react';
import { useEditor, EditorContent, BubbleMenu} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import emojiSuggestion from './suggestion'; // Ensure this path is correct and emojiSuggestion is defined
import Placeholder from '@tiptap/extension-placeholder';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import './style.scss'; // Ensure SCSS loader is configured in your project
import { ItalicIcon, BoldIcon } from './Icon';
import TextStyle from '@tiptap/extension-text-style'

interface TiptapProps {
  description: string;
  onChange: (richText: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      Blockquote,
      StarterKit,
      CodeBlock,
      TextStyle, 
      Highlight.configure(),
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
        // @ts-ignore
        suggestion: emojiSuggestion, // Ensure 'suggestion' is defined correctly
      }),
      Placeholder.configure({
        placeholder: 'Tell your Story …',
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'code-block',
        }}),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: 'min-h-[400px] min-w-[820px] text-xl max-w-[820px] focus:outline-none focus:ring focus:ring-white font-rome font-medium',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex justify-normal">
      <div className="mb-2 flex flex-col space-y-2 mr-4 border rounded h-full">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('bold') ? 'bg-gray-300' : ''}`}
        >
          <svg width="15px" height="15px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" fillRule="evenodd" d="M4 1a1 1 0 00-1 1v16a1 1 0 001 1v-1 1h8a5 5 0 001.745-9.687A5 5 0 0010 1H4zm6 8a3 3 0 100-6H5v6h5zm-5 2v6h7a3 3 0 100-6H5z"></path>
          </svg>
        </button>
        {/* <button
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('code') ? 'bg-gray-300' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </button> */}
        <button
          onClick={() => editor?.chain().focus().toggleHighlight({ color: '#f9f5a0' }).run()}
          className={`px-2 py-1 rounded ${editor?.isActive('highlight', { color: '#f9f5a0' }) ? 'bg-gray-300' : ''}`}
        >
          <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <path d="M15 9.361v-7.6l-6 2.4v5.2l-3 5V23h1v-8h10v8h1v-8.639zm-5-4.523l4-1.6V7h-4zm0 4.8V8h4v1.639L16.617 14H7.383z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
          </svg>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('blockquote') ? 'bg-gray-300' : ''}`}
        >
          <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 15V14C14 13.0681 14 12.6022 14.1522 12.2346C14.3552 11.7446 14.7446 11.3552 15.2346 11.1522C15.6022 11 16.0681 11 17 11H17.5C18.9045 11 19.6067 11 20.1111 11.3371C20.3295 11.483 20.517 11.6705 20.6629 11.8889C21 12.3933 21 13.0955 21 14.5V15.3431C21 16.1606 21 16.5694 20.8478 16.9369C20.6955 17.3045 20.4065 17.5935 19.8284 18.1716L19.2396 18.7604C18.7822 19.2178 18 18.8938 18 18.2469V17.8787C18 17.3934 17.6066 17 17.1213 17H16C14.8954 17 14 16.1046 14 15Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round"></path>
            <path d="M3 9V8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H6.5C7.90446 5 8.60669 5 9.11114 5.33706C9.32952 5.48298 9.51702 5.67048 9.66294 5.88886C10 6.39331 10 7.09554 10 8.5V9.34315C10 10.1606 10 10.5694 9.84776 10.9369C9.69552 11.3045 9.40649 11.5935 8.82843 12.1716L8.23965 12.7604C7.78219 13.2178 7 12.8938 7 12.2469V11.8787C7 11.3934 6.6066 11 6.12132 11H5C3.89543 11 3 10.1046 3 9Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round"></path>
            <path opacity="0.1" d="M14 15V14C14 13.0681 14 12.6022 14.1522 12.2346C14.3552 11.7446 14.7446 11.3552 15.2346 11.1522C15.6022 11 16.0681 11 17 11H17.5C18.9045 11 19.6067 11 20.1111 11.3371C20.3295 11.483 20.517 11.6705 20.6629 11.8889C21 12.3933 21 13.0955 21 14.5V15.3431C21 16.1606 21 16.5694 20.8478 16.9369C20.6955 17.3045 20.4065 17.5935 19.8284 18.1716L19.2396 18.7604C18.7822 19.2178 18 18.8938 18 18.2469V17.8787C18 17.3934 17.6066 17 17.1213 17H16C14.8954 17 14 16.1046 14 15Z" fill="#000000"></path>
            <path opacity="0.1" d="M3 9V8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H6.5C7.90446 5 8.60669 5 9.11114 5.33706C9.32952 5.48298 9.51702 5.67048 9.66294 5.88886C10 6.39331 10 7.09554 10 8.5V9.34315C10 10.1606 10 10.5694 9.84776 10.9369C9.69552 11.3045 9.40649 11.5935 8.82843 12.1716L8.23965 12.7604C7.78219 13.2178 7 12.8938 7 12.2469V11.8787C7 11.3934 6.6066 11 6.12132 11H5C3.89543 11 3 10.1046 3 9Z" fill="#000000"></path>
          </svg>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('codeBlock') ? 'bg-gray-300' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </button>
        <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded ${editor?.isActive('strike') ? 'bg-gray-300' : ''}`}
          >
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17 5H10C8.34315 5 7 6.34315 7 8V9C7 10.6569 8.34315 12 10 12H17M7 19H14C15.6569 19 17 17.6569 17 16V15" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M5 12H19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></g></svg>
          </button>
      </div>
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu bg-zinc-800 text-gray-100 rounded">
          <div className='px-2 py-1'>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                {/* Bold */}
                <BoldIcon /> 
              </button>
          </div>
          
          <div className='px-2 py-1'>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                {/* Italic */}
                <ItalicIcon /> 
              </button>
          </div>
          {/* <div>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={` ${editor.isActive('strike') ? 'is-active' : ''} `}
              > */}
                {/* Strike  */}
                {/* <svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="	#FFFFFF" stroke="	#FFFFFF" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.513 5.257c0 .266.026.514.077.743h2.36a1.835 1.835 0 01-.224-.265 1.157 1.157 0 01-.142-.585c0-.424.165-.755.496-.99.33-.248.773-.372 1.327-.372.496 0 .944.088 1.345.265.401.177.79.419 1.168.726l1.045-1.31a4.91 4.91 0 00-1.611-1.062A4.842 4.842 0 008.407 2c-.566 0-1.091.083-1.575.248a3.74 3.74 0 00-1.221.69 3.336 3.336 0 00-.815 1.044c-.188.39-.283.814-.283 1.275zM8.177 14a6.004 6.004 0 01-2.265-.443A5.913 5.913 0 014 12.301l1.204-1.398c.413.389.885.708 1.415.955a3.894 3.894 0 001.593.354c.661 0 1.163-.135 1.505-.407a1.31 1.31 0 00.513-1.08c0-.235-.047-.436-.142-.601a1.156 1.156 0 00-.371-.425 2.588 2.588 0 00-.567-.354 10.36 10.36 0 00-.708-.318L8.382 9H2V7h12v2h-2.046c.08.14.148.291.205.451.118.319.177.69.177 1.115 0 .472-.094.915-.283 1.328a3.227 3.227 0 01-.832 1.097c-.354.307-.79.555-1.31.744-.507.177-1.085.265-1.734.265z" fill="	#FFFFFF"></path></g></svg>
              </button>
          </div> */}
          
        </div>
      </BubbleMenu>}

      <EditorContent editor={editor} />
      {/* @ts-ignore */}
      <style jsx>{`
        .ProseMirror code {
          background-color: #f6f3fe;
          padding: 2px 4px;
        }
      `}</style>
    </div>
  );
};

export default Tiptap;

