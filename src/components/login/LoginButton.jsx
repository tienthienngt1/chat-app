import { Button, Space } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styled from "styled-components";
import {
	onAuthStateChanged,
	signInWithPopup,
	FacebookAuthProvider,
} from "firebase/auth";
import { auth} from "../../firebase/config";
import { useDispatch } from "react-redux";
import { isLogin } from "../../redux/action/login";
import { useHistory } from "react-router-dom";

const Wrap = styled.div`
	padding: 10px;
`;

const LoginButton = () => {
    const history = useHistory();
	const dispatch = useDispatch();
	const handleFbButton = () => {
		const fbProvider = new FacebookAuthProvider();
		signInWithPopup(auth, fbProvider)
			.then((res) => {
				const action = isLogin();
                dispatch(action);
                return history.push("/home")
			})
			.catch((err) => console.log(err));
	};
	onAuthStateChanged(auth, (res) => {});
	return (
		<>
			<Wrap>
				<center>
					<Space align="end">
						<Button
							shape="round"
							type="primary"
							ghost
							icon={<GoogleOutlined />}
						>
							Google
						</Button>
						<Button
							onClick={handleFbButton}
							shape="round"
							danger
							type="ghost"
							icon={<FacebookFilled />}
						>
							Facebook
						</Button>
					</Space>
				</center>
			</Wrap>
		</>
	);
};

export default LoginButton;
