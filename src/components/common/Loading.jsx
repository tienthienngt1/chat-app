import styled from "styled-components";

const LoadingStyled = styled.div`
	width: 100vw;
	height: 100vh;
    display: flex;
    justify-content: center;
    align-items:center;
	.loader {
		width: 100px;
		height: 75px;
		margin: 0 auto;
		background: #E4E9BE;
		position: relative;
		border-radius: 100%;
	}
	.loader:before {
		content: "";
		position: absolute;
		box-sizing: border-box;
		border: 15px solid transparent;
		border-top: 25px solid #E4E9BE;
		transform: rotate(45deg);
		top: 50px;
		left: -15px;
	}

	.loader:after {
		content: "";
		width: 12px;
		height: 12px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background-color: #ff3d00;
		box-shadow: 20px 0 #ff3d00, -20px 0 #ff3d00;
		animation: flash 0.5s ease-out infinite alternate;
	}

	@keyframes flash {
		0% {
			background-color: rgba(255, 60, 0, 0.25);
			box-shadow: 20px 0 rgba(255, 60, 0, 0.25), -20px 0 #ff3d00;
		}
		50% {
			background-color: #ff3d00;
			box-shadow: 20px 0 rgba(255, 60, 0, 0.25),
				-20px 0 rgba(255, 60, 0, 0.25);
		}
		100% {
			background-color: rgba(255, 60, 0, 0.25);
			box-shadow: 20px 0 #ff3d00, -20px 0 rgba(255, 60, 0, 0.25);
		}
	}
`;

const Loading = () => {
	return (
		<LoadingStyled>
			<span className="loader"></span>
		</LoadingStyled>
	);
};

export default Loading;
