import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setShowSignIn }) => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault();
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
                    background : 'black'
                });
                form.reset();
                navigate('/')

            })
            .catch(err =>{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                    background : 'black'
                });
            })

    }

    return (
        <div className=" rounded-sm  bg-base-100 p-5 text-black">
            <h1 className="mb-6 text-center text-xl font-semibold text-black">Sign Up</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full rounded-sm" />
                <input name="email" type="email" placeholder="Your Email" className="input input-bordered w-full rounded-sm" />
                <input name="password" type="password" placeholder="Your Password" className="input input-bordered w-full rounded-sm" />
                <input type="submit" value="Sign Up" className="btn bg-black text-white hover:text-black rounded-sm" />
            </form>
            <div className="divider">OR</div>
            <div className="flex flex-col items-center justify-center gap-4">
                <button className="btn btn-outline btn-wide rounded-sm"><FaGoogle /> Continue With Google</button>
                <p>Already Have Account ? <button onClick={() => setShowSignIn(true)} className="text-blue-700 font-semibold">Sign In</button> </p>
            </div>
        </div>
    );
};

export default SignUp;