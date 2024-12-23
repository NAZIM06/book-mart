import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';


const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Footer></Footer>
        </>
    );
};

export default Main;