import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";


const DashBoard = () => {

    const {logOutUser} = useContext(AuthContext)

    const handleLogOut = ()=>{
        logOutUser()
        .then(res=>{
            console.log(res.user)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfuly Signned Out",
                showConfirmButton: false,
                timer: 1500,
                background : 'black'
            });
        })
    }

    return (
        <div>
            <button onClick={handleLogOut} className="btn bg-red-800 text-white hover:text-black">Sign Out</button>   
        </div>
    );
};

export default DashBoard;