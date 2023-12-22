import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCompletedTasks = ({email}) => {
    const { data : completed =[], isLoading, refetch } = useQuery({
        queryKey:['completed', email],
        queryFn : async()=>{
            const res = await axios.get(`https://task-manager-server-nine-phi.vercel.app/completed?email=${email}`)
            return res.data
        }
    })
    return {completed, isLoading, refetch}
};

export default useCompletedTasks;