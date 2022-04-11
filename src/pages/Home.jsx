import { useEffect, useState } from "react";
import Message from "../components/home/message";
import Navbar from "../components/home/navbar";
import { Row, Col } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(Row)`
	height: 100vh;
	#background_message {
		background: rgb(2, 0, 36);
		background: linear-gradient(90deg, #6aab9c 0%, #5874dc 100%);
	}
`;

const Home = () => {
	// set screen for mobile
	const width = window.innerWidth;
	const [isDisplay, setIsDisplay] = useState(true);
	if (width < 768) {
		if (isDisplay) setIsDisplay(false);
	}

	useEffect(() => {
		const subcribe = window.addEventListener("resize", () => {
			const wd = window.innerWidth;
			if (wd < 768) {
				if (isDisplay) setIsDisplay(false);
			} else {
				if (!isDisplay) setIsDisplay(true);
			}
		});
		return () => subcribe;
	}, [isDisplay]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
		>
			<Wrap justify="center">
				<Col span={24} lg={8} md={10} xxl={6}>
					<Navbar />
				</Col>
				{isDisplay && (
					<Col
						id="background_message"
						span={24}
						lg={16}
						md={14}
						xxl={18}
					>
						<Message />
					</Col>
				)}
			</Wrap>
		</motion.div>
	);
};

export default Home;
