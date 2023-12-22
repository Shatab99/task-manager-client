import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";


const NavBar = ({children}) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content p-8">
                {children}
                <label htmlFor="my-drawer-2" className="absolute left-1 -top-12 text-white drawer-button lg:hidden"><RiMenu2Fill className="text-3xl"/></label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-gray-500 text-white">
                    {/* Sidebar content here */}
                    <li><Link to={'/'} className="text-xl font-bold mt-12 border-b-2 rounded-none"><LuListTodo className="text-xl"/>To-Do</Link></li>
                    <li><Link to={'/ongoing'} className="text-xl font-bold border-b-2 rounded-noneborder-b-2 rounded-none"><MdOutlineCallMissedOutgoing className="text-xl"/> On Going</Link></li>
                    <li><Link to={'/completed'} className="text-xl font-bold border-b-2 rounded-none"><FaCheck className="text-xl"/> Completed</Link></li>
                    <li><Link to={'/dashboard'} className="text-xl font-bold border-b-2 rounded-none"><LuLayoutDashboard className="text-xl"/>  Dashboard</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default NavBar;