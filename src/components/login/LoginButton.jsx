import { useHistory } from "react-router-dom";
import { Button, Space } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { user } from "../../redux/reducer/user";
import author from "../../assets/author.gif";

const Wrap = styled.div`
	padding: 10px;
`;

const LoginButton = () => {
	const history = useHistory();
	console.log(auth.currentUser);
	const dispatch = useDispatch();
	const handleFbButton = () => {
		const fbProvider = new FacebookAuthProvider();
		signInWithPopup(auth, fbProvider)
			.then((res) => {
<<<<<<< HEAD
                const {displayName, email, phoneNumber, photoURL, uid} = res.user
                dispatch(user({displayName, email, phoneNumber, photoURL, uid, id: res.id}));
                return history.push("/home")
=======
				const { displayName, email, phoneNumber, photoURL, uid } =
					res.user;
				dispatch(
					user({
						displayName,
						email,
						phoneNumber,
						photoURL,
						uid,
						id: res.id,
					})
				);
				return history.push("/home");
>>>>>>> 22f26c6 (fix 2)
			})
			.catch((err) => alert("Error!"));
	};
<<<<<<< HEAD
	onAuthStateChanged(auth, user => console.log('onAuth' + user));
=======
>>>>>>> 22f26c6 (fix 2)
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
					<div>
						Design by <img src={author} alt="author" />
					</div>
				</center>
			</Wrap>
		</>
	);
};

export default LoginButton;
