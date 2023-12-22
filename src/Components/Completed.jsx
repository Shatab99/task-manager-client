import { useContext } from "react";
import useCompletedTasks from "./Hooks/useCompletedTasks";
import Activity from "./SubComponents/Activity";
import Heading from "./SubComponents/Heading";
import { AuthContext } from "../Providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";



const Completed = () => {
    const { user } = useContext(AuthContext)
    const email = user.email

    const { completed, isLoading, refetch } = useCompletedTasks({ email })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            background: 'black',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "green",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://task-manager-server-nine-phi.vercel.app/completed/${id}`)
                    .then(res => {
                        console.log(res)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            background: 'black',
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0">
            <div className="lg:col-span-3">
                <Heading heading={'Completed'} />
                <InfiniteScroll dataLength={completed.length} height={500} className="mt-12 border-t-2 border-b-2 p-5">
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
                                completed.length === 0 ?
                                    <div className="flex flex-col mt-48 justify-center items-center">
                                        <p className="text-5xl animate-pulse">No Task Found </p>
                                    </div>
                                    :
                                    completed.map(task => <>
                                        <div className="shadow-2xl p-4 border-2 rounded-sm">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-3xl font-bold flex items-center gap-2">{task.title}<div className={`badge badge-outline
            ${task.priority === 'High' && 'text-orange-400'}
            ${task.priority === 'Medium' && 'text-purple-400'}
            ${task.priority === 'Low' && 'text-green-400'}
        `}>{task.priority}</div></h1>
                                                <button className="">
                                                    <div className="dropdown dropdown-bottom dropdown-end flex items-center gap-4">
                                                        <h1 className="font-bold">Completed in {task.date}</h1>
                                                        <MdDelete onClick={() => handleDelete(task._id)} className="text-3xl text-red-800 hover:text-red-600" />
                                                    </div>
                                                </button>
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

export default Completed;