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

const Message = () => {
    const currentRoom = useSelector((state) => state.currentRoom);
	return (
		<Wrap justify="center">
			{currentRoom && currentRoom.is ? (
				<>
					<Col>
						<Affix offsetTop>
							<HeaderMessage {...currentRoom} />
						</Affix>
					</Col>
					<Col>
						<BodyMessage {...currentRoom.rooms.payload}/>
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
