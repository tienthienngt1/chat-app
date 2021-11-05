import { Button, Space } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styled from "styled-components";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../../firebase/config"

const Wrap = styled.div`
	padding: 10px;
`;

const LoginButton = () => {
	const handleFbButton = () => {
		const fbProvider = new FacebookAuthProvider();
		signInWithPopup(auth, fbProvider).then(res => {
            const {user: {displayName, email, photoURL, uid}} = res
                setDoc(doc(db, "user", "name"), {displayName, email, photoURL, uid}).then(res => console.log(res)).catch(err => console.log(err))
        })
        .catch(err => console.log(err))
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
				</center>
			</Wrap>
		</>
	);
};

export default LoginButton;
