import { useContext } from "react";
import useOngoing from "./Hooks/useOngoing";
import Activity from "./SubComponents/Activity";
import Heading from "./SubComponents/Heading";
import { AuthContext } from "../Providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2";


const OnGoing = () => {
    const { user } = useContext(AuthContext)
    const email = user.email;
    const { ongoing, isLoading, refetch } = useOngoing({ email })


    const handleCancel = (id)=>{
        axios.patch(`https://task-manager-server-nine-phi.vercel.app/tasks/${id}`, {status : null})
        .then(res=>{
            console.log(res)
            refetch();
        })
    }

    const handleComplete = (task) => {
        const deleteID = task._id
        const email = task.email
        const priority = task.priority
        const tasks = task.tasks
        const title = task.title
        const date = new Date().toISOString().split('T')[0];

        const completeForm = {
            email, priority, tasks, title, date
        }
        axios.post('https://task-manager-server-nine-phi.vercel.app/completed', completeForm)
            .then(res => {
                console.log(res)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Good Job ! You completed task .",
                    showConfirmButton: false,
                    timer: 1500
                });
                axios.delete(`https://task-manager-server-nine-phi.vercel.app/tasks/${deleteID}`)
                    .then(res => {
                        console.log(res)
                        refetch();
                    })
            })
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0">
            <div className="lg:col-span-3">
                <Heading heading={'On Going'} />

                <InfiniteScroll dataLength={10} height={500} className="mt-12 border-t-2 border-b-2 p-5">
                    <div className="grid grid-cols-1 gap-6">
                        {
                            isLoading ?
                                <div className="mx-auto">
                                    <div className="flex flex-col gap-4 w-52 justify-center">
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                    </div>
                                </div>
                                :
                                ongoing.length === 0 ?
                                    <div className="flex flex-col mt-48 justify-center items-center">
                                        <p className="text-5xl animate-pulse">No Task Found </p>
                                    </div>
                                    :
                                    ongoing.map(task => <>
                                        <div className="shadow-2xl p-4 border-2 rounded-sm">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-3xl font-bold flex items-center gap-2">{task.title}<div className={`badge badge-outline
            ${task.priority === 'High' && 'text-orange-400'}
            ${task.priority === 'Medium' && 'text-purple-400'}
            ${task.priority === 'Low' && 'text-green-400'}
        `}>{task.priority}</div></h1>
                                                <div className="flex items-center gap-4">
                                                    <div className="tooltip" data-tip="Mark As Completed">
                                                        <button onClick={()=> handleComplete(task)} className="btn btn-sm text-white hover:text-black bg-green-800"><TiTickOutline className="text-xl "/></button>
                                                    </div>
                                                    <div className="tooltip lg:mr-12" data-tip="Cancel on going task">
                                                        <button onClick={()=> handleCancel(task._id)} className="btn btn-sm text-xl text-white hover:text-black bg-red-800"><RxCross2 /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-4">{task.tasks}</p>
                                        </div>
                                    </>)
                        }
                    </div>
                </InfiniteScroll>

            </div>
            <div>
                <Activity />
            </div>

        </div>
    );
};

export default OnGoing;