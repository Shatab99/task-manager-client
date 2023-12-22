import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setShowSignIn }) => {
    const { logInUser , googleSignIn} = useContext(AuthContext)
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSignIn = (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        logInUser(email, password)
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfuly Signned in !",
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'black'
                });
                form.reset();
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'black'
                });
                setLoading(false)
            })
    }

    const handleGoogle = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err =>{
            console.log(err.message)
        })
    }


    return (
        <div className=" rounded-sm  bg-base-100 p-5 text-black">
            <h1 className="mb-6 text-center text-xl font-semibold text-black">Sign In</h1>
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <input name="email" type="email" placeholder="Your Email" className="input input-bordered w-full rounded-sm" />
                <input name="password" type="password" placeholder="Your Password" className="input input-bordered w-full rounded-sm" />
                {
                    loading ?  <button className="btn bg-black text-white hover:text-black" disabled><span className="loading loading-spinner"></span> </button> 
                    :
                    <input type="submit" value="Sign In" className="btn bg-black text-white hover:text-black rounded-sm" />
                }
            </form>
            <div className="divider">OR</div>
            <div className="flex flex-col items-center justify-center gap-4">
                <button onClick={handleGoogle} className="btn btn-outline btn-wide rounded-sm"><FaGoogle /> Continue With Google</button>
                <p>{`Don't`} Have Account ? <button onClick={() => setShowSignIn(false)} className="text-blue-700 font-semibold">Sign Up</button> </p>
            </div>
        </div>
    );
};

export default SignIn;