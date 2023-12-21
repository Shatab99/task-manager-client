import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const NavTop = () => {

    const { user } = useContext(AuthContext)


    return (
        <div className="navbar bg-black text-white">
            <div className="navbar-start">

            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Task Manager</a>
            </div>
            <div className="navbar-end gap-5">
                <button className=" flex items-center gap-3">
                    <FaUserAstronaut className="text-2xl" />
                    <div>
                        <h1>{user.displayName}</h1>
                    </div>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <FaSearch  className="text-2xl"/>
                </button>
            </div>
        </div>
    );
};

export default NavTop;