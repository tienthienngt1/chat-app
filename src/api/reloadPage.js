import { auth } from "../firebase/config";

const reload = () => {
    if(!auth.currentUser){
        localStorage.clear()
        window.location.reload()
        return;
    }
}

export default reload