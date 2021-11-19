import {Row, Affix, Alert, Col } from "antd";
import React from "react";
import styled from "styled-components";
import BodyMessage from "./BodyMessage";
import HeaderMessage from "./HeaderMessage";

const Wrap = styled(Row)`
	flex-direction: column;
	width: 100%;
`;

const Message = () => {
	return (
		<Wrap justify="center">
			<Alert message="You haven't selected any chat yet." showIcon type="info" closable/>
			{/* <Col>
				<Affix offsetTop>
					<HeaderMessage />
				</Affix>
			</Col>
			<Col >
				<BodyMessage />
			</Col> */}
		</Wrap>
	);
};

export default Message;
