import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	return (
		// <Provider store={store}>
			<Router>
				<Switch>
					<Routes />
				</Switch>
			</Router>
		// </Provider>
	);
}

export default App;
