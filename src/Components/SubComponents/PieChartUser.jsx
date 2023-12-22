import { useContext } from 'react';
import { PieChart, Pie,  Cell } from 'recharts';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



const PieChartUser = () => {

    const {user}= useContext(AuthContext)
    const email = user.email

    const {data :Count = {}}=useQuery({
        queryKey : ['todoLen', email],
        queryFn : async ()=>{
            const res = await axios.get(`https://task-manager-server-nine-phi.vercel.app/taskcount?email=${email}`)
            return res.data
        }
    })

    const data = [
        { name: 'Group A', value: Count.todoCount },
        { name: 'Group B', value: Count.completedCount },
        { name: 'Group C', value: Count.ongoing },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (

        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>

    );
}


export default PieChartUser;