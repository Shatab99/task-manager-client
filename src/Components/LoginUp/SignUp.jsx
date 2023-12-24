import { useContext, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEyeLowVision } from "react-icons/fa6";

const SignUp = ({ setShowSignIn }) => {
    const { createUser, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(res => {
                console.log(res.user)
                updateProfile(res.user, {
                    displayName: name
                })
                    .then(res => {
                        console.log("updated", res.user)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfuly Created Account",
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

    const handleGoogle = () => {
        googleSignIn()
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div className=" rounded-sm  bg-base-100 p-5 text-black">
            <h1 className="mb-6 text-center text-xl font-semibold text-black">Sign Up</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full rounded-sm" />
                <input name="email" type="email" placeholder="Your Email" className="input input-bordered w-full rounded-sm" />
                <div className="relative">
                    <input name="password" type={show ? 'text' : 'password'} placeholder="Your Password" className="input input-bordered w-full rounded-sm" />
                    {
                        show ?
                            <p onClick={() => setShow(false)}><FaEyeLowVision className="absolute top-3 text-2xl right-2" /></p>
                            :
                            <p onClick={() => setShow(true)}><FaEye className="absolute top-3 text-2xl right-2" /></p>
                    }
                </div>
                {
                    loading ? <button className="btn bg-black text-white hover:text-black" disabled><span className="loading loading-spinner"></span> </button> :
                        <input type="submit" value="Sign Up" className="btn bg-black text-white hover:text-black rounded-sm" />
                }
            </form>
            <div className="divider">OR</div>
            <div className="flex flex-col items-center justify-center gap-4">
                <button onClick={handleGoogle} className="btn btn-outline btn-wide rounded-sm"><FaGoogle /> Continue With Google</button>
                <p>Already Have Account ? <button onClick={() => setShowSignIn(true)} className="text-blue-700 font-semibold">Sign In</button> </p>
            </div>
        </div>
    );
};

export default SignUp;