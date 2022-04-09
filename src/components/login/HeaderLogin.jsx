import styled from "styled-components";
import logo from "../../assets/logo.png";

const Wrap = styled.div`
	padding: 20px;
	img {
		width: ${(props) =>
			props.width < 400 ? props.width - 20 + "px" : "387px"};
	}
`;

const HeaderLogin = () => {
	return (
		<Wrap width={window.innerWidth}>
			<center>
				<img src={logo} alt="logo" />
                <h1>LOGIN</h1>
			</center>
		</Wrap>
	);
};

export default HeaderLogin;
