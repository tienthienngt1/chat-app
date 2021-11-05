import styled from "styled-components";
import logo from "../../assets/logo.png"

const Wrap = styled.div`
    padding: 20px;
`

const HeaderLogin = () => {
    return (
        <Wrap>
            <center>
                <img src = {logo} alt="logo" />
                <h2> Login Chat App</h2>
            </center>
        </Wrap>
    );
};

export default HeaderLogin;