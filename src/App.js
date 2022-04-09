
import { useEffect, useMemo, useState} from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import Routes from "./routes";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import RootModal from "./components/common/modal/RootModal";
import { auth } from "./firebase/config";
import "./App.css";
import "antd/dist/antd.css";
import styled from "styled-components";

const Container = () => {
 const [theme, setTheme] = useState('light')
	const history = useHistory();
	const loginState = useSelector((state) => state.userReducer.isLogin);
	const user = auth.currentUser;
	useEffect(() => {
		if (!user) {
			localStorage.clear();
			history.push("/login");
		}
		if (loginState) history.push("/home");
		else history.push("/login");
	}, [loginState, history, user]);
	return (
		<>
			<Routes />
		</>
	  )
	}

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Switch>
							<Container />
						</Switch>
					</Router>
      <RootModal/>
			</PersistGate>
		</Provider>
	);
}

export default App;
