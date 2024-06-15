import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { EmojiList } from './EmojiList';

interface EmojiItem {
  name: string;
  shortcodes: string[];
  tags: string[];
  // Add more properties as per your emoji item structure
}

interface EditorInstance {
  storage: {
    emoji: {
      emojis: EmojiItem[];
    };
  };
  // Add more properties and methods as per your editor instance
}

interface EmojiSuggestionProps {
  editor: EditorInstance;
  query: string;
  clientRect: () => DOMRect;
}

interface EmojiSuggestionRender {
  onStart: (props: EmojiSuggestionProps) => void;
  onUpdate: (props: EmojiSuggestionProps) => void;
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  onExit: () => void;
}

interface EmojiSuggestion {
  items: (props: EmojiSuggestionProps) => EmojiItem[];
  allowSpaces: boolean;
  render: () => EmojiSuggestionRender;
}

const emojiSuggestion: EmojiSuggestion = {
  items: ({ editor, query }) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }) => {
        return (
          shortcodes.find(shortcode => shortcode.startsWith(query.toLowerCase())) ||
          tags.find(tag => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: () => {
    let component: ReactRenderer<any> | null = null;
    let popup: TippyInstance | null = null;

    const onStart = (props: EmojiSuggestionProps) => {
      component = new ReactRenderer(EmojiList, {
        props,
        //@ts-ignore
        editor: props.editor,
      });
//@ts-ignore
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    };

    const onUpdate = (props: EmojiSuggestionProps) => {
      if (component) {
        component.updateProps(props);
      }

      if (popup) {
        //@ts-ignore
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      }
    };

    const onKeyDown = (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        if (popup) {
            //@ts-ignore
          popup[0].hide();
        }
        if (component) {
          component.destroy();
        }
        return true;
      }

      return component?.ref?.onKeyDown(props) ?? false;
    };

    const onExit = () => {
      if (popup) {
        //@ts-ignore
        popup[0].destroy();
      }
      if (component) {
        component.destroy();
      }
    };

    return { onStart, onUpdate, onKeyDown, onExit };
  },
};

export default emojiSuggestion;
