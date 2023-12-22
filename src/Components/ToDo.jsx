import { useContext, useState } from "react";
import useTasks from "./Hooks/useTasks";
import Activity from "./SubComponents/Activity";
import AddTask from "./SubComponents/AddTask";
import Heading from "./SubComponents/Heading";
import { IoAddCircleOutline } from "react-icons/io5";
import { AuthContext } from "../Providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";


const ToDo = () => {
    const { user } = useContext(AuthContext)
    const [priority, setPriority] = useState('')
    const email = user.email
    const [tasks, isloading, refetch] = useTasks({ email, priority })


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
                axios.delete(`https://task-manager-server-nine-phi.vercel.app/tasks/${id}`)
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

    const handleOnGoing = (id) => {
        axios.patch(`https://task-manager-server-nine-phi.vercel.app/tasks/${id}`, { status: 'ongoing' })
            .then(res => {
                console.log(res)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your task is now on On-Going State .",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            })
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
            <div className="lg:col-span-3">
                <div className="flex justify-between">
                    <Heading heading={'To-Do'} />
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn bg-black text-white hover:text-black"><IoAddCircleOutline className="text-xl" /> Add Task</button>
                </div>
                <InfiniteScroll dataLength={tasks.length} height={500} className=" mt-12 border-t-2 border-b-2 p-5">
                    <div className="grid grid-cols-1 gap-6">
                        {
                            isloading ?
                                <div className="mx-auto">
                                    <div className="flex flex-col gap-4 w-52 justify-center">
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                        <div className="skeleton h-20 w-full"></div>
                                    </div>
                                </div>
                                :
                                tasks.length === 0 ?
                                    <div className="flex flex-col mt-48 justify-center items-center">
                                        <p className="text-5xl animate-pulse">No Task Found </p>
                                    </div>
                                    :
                                    tasks.map(task => <>
                                        <div className="shadow-2xl p-4 border-2 rounded-sm">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-3xl font-bold flex items-center gap-2">{task.title}<div className={`badge badge-outline
                                            ${task.priority === 'High' && 'text-orange-400'}
                                            ${task.priority === 'Medium' && 'text-purple-400'}
                                            ${task.priority === 'Low' && 'text-green-400'}
                                        `}>{task.priority}</div></h1>
                                                <div className="flex items-center gap-5">
                                                    {
                                                        task.status && <p className="badge badge-outline text-pink-600 font-bold">On Going</p>
                                                    }
                                                    <div className="dropdown dropdown-bottom dropdown-end">
                                                        <div tabIndex={0} role="button" className=""><CiMenuKebab /></div>
                                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <li><button onClick={() => handleOnGoing(task._id)}>Mark As On Goning</button></li>
                                                            <li><button onClick={() => handleComplete(task)}>Mark As Complete</button></li>
                                                            <li><button onClick={() => handleDelete(task._id)} className="hover:bg-red-700 hover:text-white">Delete Task</button></li>
                                                        </ul>
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
                <div className="border-2 rounded-lg mt-4 lg:mt-28 shadow-xl p-3 font-semibold space-y-4">
                    <p>Filter By Priority</p>
                    <select onChange={(e) => setPriority(e.target.value)} className="select select-bordered w-full max-w-xs">
                        <option>All</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
            </div>
            <AddTask refetch={refetch} />
        </div>
    );
};

export default ToDo;