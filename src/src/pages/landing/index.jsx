import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
	const state = useSelector((state) => state.userReducer.isLogin);
	const history = useHistory();
	if (state) return <>{history.push("/home")} </>;
	else return <>{history.push("/login")} </>;
};

export default Landing;
