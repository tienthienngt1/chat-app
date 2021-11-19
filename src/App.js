import { useEffect } from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import Routes from "./routes";
import "./App.css";
import "antd/dist/antd.css";
import { Provider, useSelector } from "react-redux";
import {store, persistor} from "./redux/store";

const Container = () => {
	const history = useHistory();
	const loginState = useSelector((state) => state.userReducer.isLogin);
	useEffect(() => {
		if (loginState) history.push("/home");
		else history.push("/login");
	}, [loginState, history]);
	return (
		<>
			<Routes />
		</>
	);
};

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor = {persistor}>
				<Router>
					<Switch>
						<Container />
					</Switch>
				</Router>
			</PersistGate>
		</Provider>
	);
}

export default App;
