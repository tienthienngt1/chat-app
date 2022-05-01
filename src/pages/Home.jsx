import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import {useSelector} from "react-redux";
import Message from "../components/home/message";
import Navbar from "../components/home/navbar";

const Wrap = styled(Row)`
	height: 90vh;
	${props => props.theme.theme ? props.theme.light : props.theme.dark}
`;

const Home = () => {
	// set screen for mobile
	const width = window.innerWidth;
	const [isDisplay, setIsDisplay] = useState(true);
	if (width < 768) {
		if (isDisplay) setIsDisplay(false);
	}
  //get theme
  const theme = useSelector(state => state.themeReducer)
	//effect
	useEffect(() => {
		const subcribe = window.addEventListener("resize", () => {
			const wd = window.innerWidth;
			if (wd < 768) {
				if (isDisplay) setIsDisplay(false);
			} else {
				if (!isDisplay) setIsDisplay(true);
			}
		});
		return subcribe;
	}, [isDisplay])
	//return
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
		>
			<Wrap justify="center" theme={theme}>
				<Col span={24} lg={8} md={10} xxl={6}>
					<Navbar />
				</Col>
				{ isDisplay ? (
					<Col
						span={24}
						lg={16}
						md={14}
						xxl={18}
					>
						<Message />
					</Col>) : '' }
			</Wrap>
		</motion.div>
	);
};

export default Home;
