import { useState } from "react";
import styled from "styled-components";
import {
	Space,
	Typography,
	Menu,
	Row,
	Col,
	Dropdown,
	Switch,
	Button,
	Tooltip
} from "antd";
import Icon, {
	MenuOutlined,
	SettingOutlined,
	CloseOutlined,
	FireOutlined,
	PlusOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux"
import { setIsOpenModalTrue } from "../../../redux/slice/modalSlice";
import { setTheme } from "../../../redux/slice/themeSlice";

const Wrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	padding: 5px;
	.ant-row .ant-col {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h1{
	  ${props => props.theme.theme ? props.theme.light : props.theme.dark}
	}
`;

const HeaderNavbar = props => {
  const theme = useSelector(state => state.themeReducer)
	return (
		<Wrap theme={theme}>
			<Row justify="center" align="center">
				<Col span={4}>
					<CusDropDown {...props} />
				</Col>
				<Col span={16}>
					<center>
					  <h1>ROOM LIST</h1>
					</center>
				</Col>
				<Col span={4}>
				  <CreateRoomButton />
				</Col>
			</Row>
		</Wrap>
	);
};

const CreateRoomButton = () => {
	const dispatch = useDispatch();
	const handleAdd = () => {
		dispatch(setIsOpenModalTrue());
	};

	return (
		<>
			<Tooltip title="Create Chat Room">
				<Button
					shape="circle"
					size="large"
					type="primary"
					onClick={handleAdd}
				>
					<PlusOutlined />
				</Button>
			</Tooltip>
		</>
	);
};

const WrapMenu = styled(Menu)`
 borderRadius: 10px;
 .ant-typography{
  color: ${props => props.themecus.theme ? '#000' : '#fff'}
 }
`

const MenuDrop = props=> {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.themeReducer)
	return (
		<WrapMenu themecus={theme} theme={theme.theme ? "light" : "dark"}>
			<Menu.Item onClick={() => props.setState(1)} style={{borderRadius: "10px"}}>
				<Space>
					<SettingOutlined />
					<Typography.Text>Setting</Typography.Text>
				</Space>
			</Menu.Item>
			<Menu.Item>
				<Space>
					<FireOutlined />
					<Typography.Text>Dark Mode</Typography.Text>
					<Switch checked={!theme.theme} onClick={() => {dispatch(setTheme()); props.setIsDisplay(false) }}/>
				</Space>
			</Menu.Item>
		</WrapMenu>
	);
};

const CusDropDown = props => {
	const [isDisplay, setIsDisplay] = useState(false);
	return (
		<>
			<Dropdown
				overlay={<MenuDrop {...props} setIsDisplay= {setIsDisplay}/>}
				placement="bottomRight"
				visible={isDisplay}
			>
				<div>
					{isDisplay ? (
						<Icon
							style={{ color: "black", fontSize: "30px" }}
							component={CloseOutlined}
							onClick={() => setIsDisplay(false)}
						/>
					) : (
						<Icon
              type="black"
							style={{ fontSize: "30px" }}
							component={MenuOutlined}
							onClick={() => setIsDisplay(true)}
						/>
					)}
				</div>
			</Dropdown>
		</>
	);
};

export default HeaderNavbar;
