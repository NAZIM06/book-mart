import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../components/Hooks/useAdmin";
import { useAuth } from "../components/Hooks/useAuth";
import Loader from "../pages/Shared/Loader";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <Loader/>
    }

    if(user && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default AdminRoute;