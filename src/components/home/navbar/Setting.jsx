import { useHistory } from "react-router-dom";
import {
	Form,
	Input,
	Row,
	Col,
	Typography,
	Tooltip,
	Button,
	Avatar,
} from "antd";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Setting = (props) => {
	return (
		<>
			<HeaderSetting {...props} />
			<BodySetting />
		</>
	);
};

const HeaderSettingWrap = styled(Row)`
	box-shadow: 0 4px 6px -6px #222;
	margin-bottom: 20px;
	.ant-typography{ 
	  margin-left: 20px;
	  ${props => props.theme.theme ? props.theme.light : props.theme.dark}
	}
`;

const HeaderSetting = (props) => {
  const theme = useSelector(state => state.themeReducer)
	return (
		<HeaderSettingWrap justify="start" align="middle" theme={theme}>
			<Col>
				<Tooltip title="Back">
					<Button
						onClick={() => props.setState(0)}
						icon={<ArrowLeftOutlined />}
						size="large"
						shape="circle"
					></Button>
				</Tooltip>
			</Col>
			<Col>
				<Typography.Title level={2}>
					Settings
				</Typography.Title>
			</Col>
		</HeaderSettingWrap>
	);
};

const FormBodySetting = (props) => {
	return (
		<Form
			{...props}
			name="form_name"
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
		>
			<Form.Item
				label="Full Name"
				name="username"
				rules={[
					{ require: true, message: "Please input your username" },
				]}
			>
				<Input disabled defaultValue={props.displayName} />
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{ require: true, message: "Please input your username" },
				]}
			>
				<Input disabled defaultValue={props.email} />
			</Form.Item>
		</Form>
	);
};

const BodySettingWrap = styled.div`
	padding: 5px;
  .ant-typography, label{
    ${props => props.theme.theme ? props.theme.light : props.theme.dark}
  }
`;

const BodySetting = () => {
	const history = useHistory();
	const logout = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
			localStorage.clear();
			history.push("/login");
		});
	};
	const { userReducer, themeReducer } = useSelector((state) => state);
	const { user } = userReducer;
	return (
		<>
			<BodySettingWrap theme={themeReducer}>
				<Row justify="center" align="center">
					<Avatar size="large" src={user && user.photoURL} >
						{user && user.displayName?.slice(0, 1)?.toUpperCase()}
					</Avatar>
					<Typography.Title level={2} style={{ marginLeft: "10px" }}>
						{user && user.displayName}
					</Typography.Title>
				</Row>
				<FormBodySetting style={{ margin: "20px 0px" }} {...user} />
				<Row justify="center" style={{ marginTop: "20px" }}>
					<Tooltip title="Loggout">
						<Button
							block
							shape="round"
							size="large"
							onClick={logout}
						>
							<LogoutOutlined /> Loggout
						</Button>
					</Tooltip>
				</Row>
			</BodySettingWrap>
		</>
	);
};

export default Setting;
