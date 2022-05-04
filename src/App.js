import { useEffect } from "react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import Routes from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";
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
import { setLoadingFalse, setLoadingTrue } from "./redux/slice/themeSlice";
import styled from "styled-components"

const WrapContainer = styled.div`
`

const Container = () => {
	//definition
	const history = useHistory();
	const dispatch = useDispatch();
	const {loading} = useSelector(state=>state.themeReducer)
    //useEffect
	useEffect(() => {
		const subcribe = onAuthStateChanged(auth, (res) => {
			dispatch(setLoadingTrue());
			if (res) {
        //get list user room
				const listUser  = async () => {
					const a = await getListRoom(res.uid);
					dispatch(setListRoom(a.result))
				}
        listUser()
        //set state login and user
				dispatch(setIsLoginTrue(res));
			  dispatch(setLoadingFalse());
				return history.push("/home");
			} else {
          dispatch(setIsLoginFalse())
          dispatch(resetRoom())
			    dispatch(setLoadingFalse());
				return history.push("login");
			}
		});
		return subcribe;
	}, [history, dispatch]);
	return <>{!loading ? <WrapContainer> <Routes/> </WrapContainer> : <Loading />}</>;
};

function App() {
	return (
		<Provider store={store}>
			<Router basename={window.location.pathname || ''}>
				<Switch>
					<Container />
				</Switch>
			</Router>
			<RootModal />
		</Provider>
	);
}

export default App;
