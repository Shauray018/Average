import Comments from "../components/Comments";
import { AuthSignin } from "../components/AuthSignin";
export function Signin() { 
    return(
        <div className="grid lg:grid-cols-2 grid-cols-1">
            <div>
                <AuthSignin /> 
            </div>
            <div className="">
                <Comments /> 
                </div>
        </div>
    )
}