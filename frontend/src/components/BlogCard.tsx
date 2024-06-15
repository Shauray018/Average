import {Link} from "react-router-dom"

interface BlogCardH {
  id?: number,
  authorName: string, 
  title: string,
  content: string,
  publishedDate:string
}


export function BlogCard({
  id,
  authorName, 
  title,
  content,
  publishedDate
}: BlogCardH) { 
    return ( 
      <Link to={`/blog/${id}`}>
        <div className="flex items-center justify-center">
        <div className="flex justify-center flex-col w-1/2 border-b-2 border-grar-500 ">
           <div className="flex items-center pt-5 pb-3"> 
             <div className=" pr-1">
                 <div className="inline-flex items-center justify-center w-8 h-8 text-md text-white bg-gray-500 rounded-full">
                  <AvatarHandler name={authorName} /> 
                 </div>
             </div>
             <div className="font-semibold"> 
                {authorName} 
             </div> 
             <div className="text-slate-400 pl-3 text-sm">
                {publishedDate}
             </div>
            </div>
            <div className="  text-xl font-extrabold pb-3 font-body">
                {title}
            </div>
            <div className=""> 
            <ContentHandler content={content}/>
            </div>
            <div className="py-5"> 
                <ContentTime content={content}/> 
                </div>
       </div>
       </div>
      </Link>
)
}





type ContentHandlerProps = {
    content: string;
  };
  
  const ContentHandler = ({ content }: ContentHandlerProps) => {
    const wordLimit = 35;
    const truncatedContent = content.split(" ").slice(0, wordLimit).join(" ");
  
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: truncatedContent }} /> 
      </div>
    );
  };
  
  export default ContentHandler;
  

  const ContentTime = ({content} : ContentHandlerProps) => { 
      var x = Math.floor(content.split(" ").length/30);
      if (x == 1) { 
        var m = "minute"
      } else { 
        m = "minute(s)"
      }
      return <div> 
        {x} {m} read
      </div>
  }

  export interface AvatarHandlerProp{ 
    name : string
  }

  export const AvatarHandler = ({name}: AvatarHandlerProp) => { 
    const initials = name[0]
    return(
      <> 
      {initials}
      </>
    )
  }



