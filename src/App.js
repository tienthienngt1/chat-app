import { useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import Routes from "./routes";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import RootModal from "./components/common/modal/RootModal";
import { auth } from "./firebase/config";
import "./App.css";
import "antd/dist/antd.css";
import { onAuthStateChanged } from "firebase/auth";

const Container = () => {
	// const history = useHistory();
	// useLayoutEffect(() => {
	// 	onAuthStateChanged(auth, (res) => {
	// 		if (res) {
	// 			history.push("/home");
	// 		} else history.push("login");
	// 	});
	// }, [history]);
	return (
		<>
			<Routes />
		</>
	);
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
