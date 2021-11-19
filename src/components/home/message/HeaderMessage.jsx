import { Row, Affix, Avatar, Col, Space, Typography, Tooltip } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import styled from "styled-components";

const WrapTitleAvatar = styled.div`
	padding: 10px;
	height: 60px;
	h4.ant-typography {
		margin: 0;
	}
`;

const TitleAvatar = () => {
	return (
		<WrapTitleAvatar>
			<Space direction="horizontal">
				<Avatar src="" size="large">
					a
				</Avatar>
				<Typography>
					<Typography.Title level={4}>NFT Reward</Typography.Title>
					<Typography.Text>10000 member</Typography.Text>
				</Typography>
			</Space>
		</WrapTitleAvatar>
	);
};

const HeaderMessage = () => {
	return (
		<Affix style={{ background: "aliceblue" }}>
			<Row justify="space-between" align="middle">
				<Col>
					<TitleAvatar />
				</Col>
				<Col>
					<Avatar.Group maxCount={1}>
						<Avatar src="">
							af
						</Avatar>
						<Avatar src="">
							af
						</Avatar>
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
