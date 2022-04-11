import { Row, Affix, Avatar, Col, Space, Typography, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ExportOutlined } from "@ant-design/icons";
import styled from "styled-components";

const WrapTitleAvatar = styled.div`
	padding: 10px;
	height: 60px;
	h4.ant-typography {
		margin: 0;
	}
`;

const TitleAvatar = (props) => {
	return (
		<WrapTitleAvatar>
			<Space direction="horizontal">
				<Avatar src={props.photo} size="large">
					{props?.room_name?.charAt(0)?.toUpperCase()}
				</Avatar>
				<Typography>
					<Typography.Title level={4}>
						{props?.room_name?.toUpperCase()}
					</Typography.Title>
					<Typography.Text>
						{props?.members?.length} member
					</Typography.Text>
				</Typography>
			</Space>
		</WrapTitleAvatar>
	);
};

const HeaderMessage = (props) => {
	const dispatch = useDispatch();
	const { photo, room_name, description, infoMembers } = props.rooms.payload;
	return (
		<Affix style={{ background: "aliceblue" }}>
			<Row justify="space-between" align="middle">
				<Col>
					<TitleAvatar {...props.rooms.payload} />
				</Col>
				<Col>
					<Avatar.Group maxCount={1}>
						{infoMembers?.map((info,id) => (
							<Avatar key={id}  src={info.photoURL}>
								{info?.displayName?.charAt(0)?.toUpperCase()}
							</Avatar>
						))}
					</Avatar.Group>
					<Tooltip title="Leave Chat">
						<ExportOutlined
						
							style={{
								fontSize: "30px",
								margin: "0px 20px",
								color: "#000",
							}}
						/>
					</Tooltip>
				</Col>
			</Row>
		</Affix>
	);
};

export default HeaderMessage;
