import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";


const NavBar = ({children}) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="relative drawer-content flex flex-col items-center justify-center">
                {children}
                <label htmlFor="my-drawer-2" className="absolute left-1 -top-12 text-white drawer-button lg:hidden"><RiMenu2Fill className="text-3xl"/></label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-gray-500 text-white">
                    {/* Sidebar content here */}
                    <li><Link className="text-xl font-bold mt-12">To-Do</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default NavBar;