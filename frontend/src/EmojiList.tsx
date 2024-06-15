import  {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import './EmojiList.scss';
  
  interface EmojiItem {
    name: string;
    fallbackImage?: string;
    emoji?: string;
  }
  
  interface EmojiListProps {
    items: EmojiItem[];
    command: (emoji: { name: string }) => void;
  }
  
  interface EmojiListHandle {
    onKeyDown: (x: { event: KeyboardEvent }) => boolean;
  }
  
  export const EmojiList = forwardRef<EmojiListHandle, EmojiListProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const selectItem = (index: number) => {
      const item = props.items[index];
  
      if (item) {
        props.command({ name: item.name });
      }
    };
  
    const upHandler = () => {
      setSelectedIndex((prevIndex) => ((prevIndex + props.items.length - 1) % props.items.length));
    };
  
    const downHandler = () => {
      setSelectedIndex((prevIndex) => ((prevIndex + 1) % props.items.length));
    };
  
    const enterHandler = () => {
      selectItem(selectedIndex);
    };
  
    useEffect(() => {
      setSelectedIndex(0);
    }, [props.items]);
  
    useImperativeHandle(ref, () => ({
      onKeyDown: (x) => {
        if (x.event.key === 'ArrowUp') {
          upHandler();
          return true;
        }
  
        if (x.event.key === 'ArrowDown') {
          downHandler();
          return true;
        }
  
        if (x.event.key === 'Enter') {
          enterHandler();
          return true;
        }
  
        return false;
      },
    }), [upHandler, downHandler, enterHandler]);
  
    return (
      <div className="dropdown-menu">
        {props.items.map((item, index) => (
          <button
            className={index === selectedIndex ? 'is-selected' : ''}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item.fallbackImage ? (
                // @ts-ignore
              <img src={item.fallbackImage} alt={item.name} align="absmiddle" />
            ) : (
              item.emoji
            )}
            :{item.name}:
          </button>
        ))}
      </div>
    );
  });