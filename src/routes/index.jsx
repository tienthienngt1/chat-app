import {Route} from "react-router-dom";
import Home from "../pages/Home";
import Landing from "../pages/landing";
import Login from "../pages/Login";

const routesArray = [
    { path: "/", component: Landing},
    { path: "/home", component: Home },
    { path: "/login", component: Login },
]

const Routes = () => {
    return (
        <>
            {
                routesArray.map(res => (
                    <Route key={res.path} exact path={res.path} component = {res.component} />
                ))
            }
        </>
    );
};

export default Routes;