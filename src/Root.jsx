import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import NavTop from "./Components/NavTop";


const Root = () => {
    return (
        <div>
            <NavTop/>
            <NavBar>
                <Outlet/>
            </NavBar>
        </div>
    );
};

export default Root;