import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useOngoing = ({email}) => {
    const {data : ongoing, isLoading, refetch}=useQuery({
        queryKey : ['ongoing', email],
        queryFn : async()=>{
            const res = await axios.get(`https://task-manager-server-nine-phi.vercel.app/ongoing?email=${email}`)
            return res.data
        }
    })
    return {ongoing, isLoading,refetch}
};

export default useOngoing;