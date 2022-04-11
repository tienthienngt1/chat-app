import { useHistory} from "react-router-dom";
import { Button, Space } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styled from "styled-components";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import author from "../../assets/author.gif";

const Wrap = styled.div`
	padding: 10px;
`;

const LoginButton = () => {
	const history = useHistory();
	const handleFbButton = () => {
		const fbProvider = new FacebookAuthProvider();
		signInWithPopup(auth, fbProvider)
			.then((res) => {
				return history.push("/home");
			})
			.catch((err) => alert("Error!"));
	};
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