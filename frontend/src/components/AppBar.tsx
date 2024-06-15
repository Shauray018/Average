
interface AppBarProp { 
    authorName : string
}

export const AppBar = ({authorName} : AppBarProp)  => { 
    return ( 
      
        <div className="flex items-center justify-between p-3 border-2"> 
            <a href='/blogs'>
              <div className=" font-rome font-bold text-3xl pl-3"> Medium </div>
            </a>

            <div className="flex items-center justify-center ">
              <a href="/createblog"> 
              <div className="flex items-center justify-center pr-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6b6b6b" className="size-6 ">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <div className="text-gray-600 font-body pl-1">
                  write
                </div>
              </div>
              </a>
              <div className="inline-flex items-center justify-center font-body text-xl w-8 h-8 text-md text-white bg-purple-500 rounded-full">
                  <AvatarHandler name={authorName} /> 
              </div>
            </div>
        </div>

    )
}
interface AvatarHandlerProp{ 
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