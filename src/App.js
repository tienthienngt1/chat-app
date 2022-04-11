import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import Routes from "./routes";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import RootModal from "./components/common/modal/RootModal";
import { auth } from "./firebase/config";
import "./App.css";
import "antd/dist/antd.css";
import { onAuthStateChanged } from "firebase/auth";
import { setIsLoginTrue } from "./redux/slice/userSlice";
import { Skeleton } from "antd";

const Container = () => {
	const [state, setState] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		const subcribe = onAuthStateChanged(auth, (res) => {
            setState(true);
			if (res) {
				dispatch(setIsLoginTrue(res));
				return history.push("/home");
			} else history.push("login");
		});
		return subcribe;
	}, [history, dispatch, setState]);
	return <>{state ? <Routes /> : <Skeleton avatar active />}</>;
};

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Container />
				</Switch>
			</Router>
			<RootModal />
		</Provider>
	);
}

export default App;
