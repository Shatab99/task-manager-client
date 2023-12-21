import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Lottie from "lottie-react";
import loadingAnimation from '../assets/Animation/Animation - Loading.json'
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)

    if(loading){
        return <div className="max-w-xs mx-auto"><Lottie animationData={loadingAnimation}/></div>
    }
    if(user){
        return children
    }

    return <Navigate to='/login' replace/>
};

export default PrivateRoute;