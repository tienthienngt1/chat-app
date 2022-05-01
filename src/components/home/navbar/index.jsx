import { useState } from "react";
import ChatRoom from "./ChatRoom";
import HeaderNavbar from "./HeaderNavbar";
import Setting from "./Setting";
import { motion, AnimatePresence } from "framer-motion";
import Message from "../message"

const Navbar = () => {
	const [state, setState] = useState(0);
	return (
		<AnimatePresence exitBeforeEnter>
			{state===1 ? (
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					key="modal"
					exit={{ x: "-100vw" }}
				>
					<Setting setState={setState} />
				</motion.div>
			) 
			: state === 2 ? (
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					key="modal"
					exit={{ x: "-100vw" }}
				>
					<Message setState={setState} />
				</motion.div>
			)
			:
			(
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
						<HeaderNavbar setState={setState} />
						<ChatRoom setState = {setState}/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Navbar;
