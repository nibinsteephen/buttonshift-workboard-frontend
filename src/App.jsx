import { ToastContainer } from "react-toastify";
import MainRouter from "./routing/routers/MainRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                theme="light"
            />
            <MainRouter />
        </>
    );
}

export default App;
