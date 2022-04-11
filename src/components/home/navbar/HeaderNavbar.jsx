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
} from "antd";
import Icon, {
	MenuOutlined,
	SettingOutlined,
	SearchOutlined,
	CloseOutlined,
	FireOutlined,
} from "@ant-design/icons";

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
				<Col span={4} xl={4}>
					<CusDropDown {...props} />
				</Col>
				<Col span={20} xl={20}>
					<Input
						prefix={<SearchOutlined size="large" />}
						size="large"
						placeholder="Search..."
					/>
				</Col>
			</Row>
		</Wrap>
	);
};


const MenuDrop = props=> {
	const handleSetting = () => {
        props.setState(true)
	};
	return (
		<Menu style={{ borderRadius: "10px" }}>
			<Menu.Item key="0"  onClick={handleSetting} style={{borderRadius: "10px"}}>
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
