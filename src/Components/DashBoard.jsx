import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import Heading from "./SubComponents/Heading";
import Activity from "./SubComponents/Activity";
import PieChartUser from "./SubComponents/PieChartUser";
import { FaDiamond } from "react-icons/fa6";


const DashBoard = () => {

    const { logOutUser, user } = useContext(AuthContext)

    const handleLogOut = () => {
        logOutUser()
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfuly Signned Out",
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'black'
                });
            })
    }

    return (
        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0 ">
            <div className="lg:col-span-3">
                <Heading heading={'Dashborad'} />
                <div className="flex flex-col items-center">
                    <PieChartUser/>
                    <div className="flex items-center gap-5">
                        <h1 className="flex items-center gap-3 text-[#0088FE] font-bold"><FaDiamond /> To-Do</h1>
                        <h1 className="flex items-center gap-3 text-[#00C49F] font-bold"><FaDiamond /> Completed</h1>
                        <h1 className="flex items-center gap-3 text-[#FFBB28] font-bold"><FaDiamond /> On Going</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-12">
                <div className="border-2 p-4 rounded-lg shadow-2xl flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                    <h1 className="font-semibold text-gray-400">{user.email}</h1>
                    <button onClick={handleLogOut} className="btn bg-red-800 text-white hover:text-black">Sign Out</button>
                </div>
                <Activity/>
            </div>
        </div>
    );
};

export default DashBoard;