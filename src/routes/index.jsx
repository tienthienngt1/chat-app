import { onAuthStateChanged } from "firebase/auth";
import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { auth } from "../firebase/config";
import Home from "../pages/Home";
import Login from "../pages/Login";

const routesArray = [
	{ path: "/home", component: Home },
	{ path: "/login", component: Login },
];

const Routes = () => {
	const history = useHistory();
	useLayoutEffect(() => {
		onAuthStateChanged(auth, (res) => {
			if (res) {
				return history.push("/home");
			}
		});
	}, [history]);
	return (
		<>
			{routesArray.map((res) => (
				<Route
					key={res.path}
					exact
					path={res.path}
					component={res.component}
				/>
			))}
		</>
	);
};

export default Routes;
