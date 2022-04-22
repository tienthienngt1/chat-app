import { useState } from "react";
import styled from "styled-components";
import {
	Space,
	Typography,
	Input,
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
	SearchOutlined,
	CloseOutlined,
	FireOutlined,
	PlusOutlined
} from "@ant-design/icons";
import {useDispatch} from "react-redux"
import { setIsOpenModalTrue } from "../../../redux/slice/modalSlice";

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
`;

const HeaderNavbar = props => {
	return (
		<Wrap>
			<Row justify="center" align="center">
				<Col span={4}>
					<CusDropDown {...props} />
				</Col>
				<Col span={16}>
					<Input
						prefix={<SearchOutlined size="large" />}
						size="large"
						placeholder="Search..."
					/>
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

const MenuDrop = props=> {
	return (
		<Menu style={{ borderRadius: "10px" }}>
			<Menu.Item key="0"  onClick={() => props.setState(1)} style={{borderRadius: "10px"}}>
				<Space>
					<SettingOutlined />
					<Typography.Text>Setting</Typography.Text>
				</Space>
			</Menu.Item>
			<Menu.Item key="1">
				<Space>
					<FireOutlined />
					<Typography.Text>Dark Mode</Typography.Text>
					<Switch />
				</Space>
			</Menu.Item>
		</Menu>
	);
};

const CusDropDown = props => {
	const [isDisplay, setIsDisplay] = useState(false);
	return (
		<>
			<Dropdown
				overlay={<MenuDrop {...props} />}
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
