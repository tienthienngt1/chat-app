import {useHistory} from "react-router-dom"

const Landing = () => {
    const history = useHistory();
    return (
        <>
            {
                history.push("/login")
            }
        </>
    );
};

export default Landing;