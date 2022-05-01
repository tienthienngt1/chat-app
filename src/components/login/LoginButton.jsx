import { useHistory} from "react-router-dom";
import { Button, Space } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styled from "styled-components";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useDispatch} from "react-redux";
import { auth } from "../../firebase/config";
import author from "../../assets/author.gif";
import { insertUser } from "../../api/insert";
import { setLoadingTrue, setLoadingFalse } from "../../redux/slice/themeSlice";

const Wrap = styled.div`
	padding: 10px;
`;

const LoginButton = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const handleFbButton = async () => {
	  dispatch(setLoadingTrue())
		const fbProvider = new FacebookAuthProvider();
		try{
		  const res = await signInWithPopup(auth, fbProvider)
		  console.log(res)
		  const createdAt = res.user.metadata.createdAt *1
		  const lastLoginAt = res.user.metadata.lastLoginAt *1
			  if(lastLoginAt - createdAt <= 1000){
			    await insertUser()
			  }
	      dispatch(setLoadingFalse())
				return history.push("/home");
			} catch(err){
	    dispatch(setLoadingFalse())
			alert("Error!")
			}
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