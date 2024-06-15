import { AuthSignup } from "../components/AuthSignup";
import Comments from "../components/Comments";


export function Signup() { 
    return(
        <div className="grid lg:grid-cols-2 grid-cols-1">
            <div>
                <AuthSignup /> 
            </div>
            <div className="">
                <Comments /> 
                </div>
        </div>
    )
}