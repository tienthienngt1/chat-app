import styled from "styled-components";
import author from  "../../assets/author.gif"

const Wrap = styled.div`
    padding: 20px;
`;

const Footer = () => {
	return (
		<Wrap>
				<center>Design by <img src={author} alt="author"/></center>
		</Wrap>
	);
};

export default Footer;
