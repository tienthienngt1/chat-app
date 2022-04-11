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
import { setIsLoginFalse, setIsLoginTrue } from "./redux/slice/userSlice";
import Loading from "./components/common/Loading";
import { getListRoom } from "./api/get";
import { resetRoom, setListRoom } from "./redux/slice/roomSlice";

const Container = () => {
	//definition
    const [state, setState] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
    //useEffect
	useEffect(() => {
		const subcribe = onAuthStateChanged(auth, (res) => {
			setState(true);
			if (res) {
                console.log("login");
                //get list user room
				const listUser  = async () => {
					const a = await getListRoom(res.uid);
					dispatch(setListRoom(a.result))
				}
                listUser()
                //set state login and user
				dispatch(setIsLoginTrue(res));
                //return
				setState(true);
				return history.push("/home");
			} else {
                dispatch(setIsLoginFalse())
                dispatch(resetRoom())
                dispatch(resetRoom())
				setState(true);
				return history.push("login");
			}
		});
		return subcribe;
	}, [history, dispatch, setState]);
	return <>{state ? <Routes /> : <Loading />}</>;
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
