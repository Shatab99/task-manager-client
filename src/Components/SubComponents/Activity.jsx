import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const Activity = () => {

    const {user}= useContext(AuthContext)
    const email = user.email

    const {data = {}}=useQuery({
        queryKey : ['todoLen', email],
        queryFn : async ()=>{
            const res = await axios.get(`https://task-manager-server-nine-phi.vercel.app/taskcount?email=${email}`)
            return res.data
        }
    })



    console.log(data)
    return (
        <div className="border-2 p-4 rounded-lg shadow-2xl flex flex-col  gap-4">
            <h1 className="text-lg font-semibold text-center">Activity</h1>
            <div className="flex flex-col gap-2 items-start font-semibold">
                <p>To-Do : {data.todoCount ? data.todoCount : 0}</p>
                <p>On Going : {data.ongoing} </p>
                <p>Completed : {data.completedCount ? data.completedCount : 0} </p>

            </div>
        </div>
    );
};

export default Activity;