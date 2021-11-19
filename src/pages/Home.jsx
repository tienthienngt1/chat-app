import {useEffect, useState} from "react"
import Message from "../components/home/message";
import Navbar from "../components/home/navbar";
import { Row, Col } from "antd";
import styled from "styled-components";

const Wrap = styled(Row)`
    height: 100vh;
    #background_message{
        background: rgb(2,0,36);
        background: linear-gradient(90deg, #6aab9c 0%, #5874dc 100%);
    }
`

const Home = () => {
    const width = window.innerWidth
    const [isDisplay, setIsDisplay] = useState(true)
    if(width < 768){
        if(isDisplay) setIsDisplay(false)
    }
    useEffect(() => {
        const subcribe = window.addEventListener("resize", () => {
            const wd = window.innerWidth
            if(wd < 768){
                if(isDisplay) setIsDisplay(false)
            }else{
                if(!isDisplay) setIsDisplay(true)
            }
        })
        return () => subcribe
    },[isDisplay])
	return (
		<Wrap justify="center">
			<Col span={24} lg={8} md ={10} style = {{border: "1px solid red"}} xxl={6} >
				<Navbar />
			</Col>
            {
                isDisplay &&
			<Col id="background_message" span={24} lg={16} md={14} xxl={18}>
				<Message />
			</Col>
            }
		</Wrap>
	);
};

export default Home;
