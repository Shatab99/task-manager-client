import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext =  createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser]= useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email , password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email , password)
    }

    const logOutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setLoading(false)
            setUser(currentUser)
        })
        return ()=>{
            return unSubscribe();
        }
    },[])



    const info ={
        user, createUser, logInUser , loading,logOutUser
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;