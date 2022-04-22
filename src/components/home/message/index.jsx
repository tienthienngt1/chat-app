import { useSelector } from "react-redux";
import { Row, Affix, Alert, Col } from "antd";
import React from "react";
import styled from "styled-components";
import BodyMessage from "./BodyMessage";
import HeaderMessage from "./HeaderMessage";

const Wrap = styled(Row)`
	flex-direction: column;
	width: 100%;
`;

const Message = props => {
    const {currentRoom} = useSelector((state) => state.roomReducer);
	return (
		<Wrap justify="center">
			{currentRoom ? (
				<>
					<Col>
						<Affix offsetTop>
							<HeaderMessage {...currentRoom} {...props}  />
						</Affix>
					</Col>
					<Col>
						<BodyMessage {...currentRoom} />
					</Col>
				</>
			) : (
				<Alert
					message="You haven't selected any chat yet."
					showIcon
					type="info"
					closable
				/>
			)}
		</Wrap>
	);
};

export default Message;
