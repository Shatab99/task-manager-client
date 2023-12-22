import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useTasks = ({email,priority}) => {
    const {data : tasks = [], isLoading, refetch}= useQuery({
        queryKey : ['tasks', email, priority],
        queryFn : async()=>{
            const res = await axios.get(`https://task-manager-server-nine-phi.vercel.app/tasks?select=${priority}&email=${email}`)
            return res.data;
        }
    })
    return [tasks, isLoading , refetch]
};

export default useTasks;