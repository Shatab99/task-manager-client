import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const AddTask = ({refetch}) => {
    const [show, setShow] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const { user } = useContext(AuthContext)

    const handleAdd = e => {
        e.preventDefault()
        setIsloading(true)
        const form = e.target;
        const email = user.email
        const title = form.title.value
        const priority = form.priority.value
        const tasks = form.tasks.value
        const taskForm = {
            title, priority, tasks, email
        }
        console.log(taskForm)
        axios.post(`https://task-manager-server-nine-phi.vercel.app/tasks`, taskForm)
            .then(res => {
                console.log(res)
                refetch();
                setIsloading(false)
                setShow(true)
            })

    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={()=> setShow(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {
                        show ? <div>
                            <p className="font-bold text-center animate-bounce">Task Successfully Added</p>
                        </div> :
                            <>
                                <h3 className="font-bold text-lg text-center">Add Your Task Here</h3>
                                <form onSubmit={handleAdd} className="flex flex-col mt-5 space-y-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <input name="title" type="text" placeholder="Title of task" required className="input input-bordered w-full max-w-xs" />
                                        <select name="priority" className="select select-bordered w-full max-w-xs" required>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                    <textarea name="tasks" placeholder="Add your task here " className="textarea textarea-bordered textarea-lg w-full " required></textarea>
                                    {
                                        isloading? <button className="btn bg-black text-white hover:text-black" disabled><span className="loading loading-spinner"></span> </button> :
                                        <button className="btn bg-black text-white hover:text-black">Add Task </button>
                                    }
                                </form>

                            </>
                    }
                    </div>
            </dialog>
        </div >
    );
};

export default AddTask;