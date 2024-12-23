import { Navigate, useLocation } from "react-router-dom";
import Loader from "../pages/Shared/Loader";
import { useAuth } from "../components/Hooks/useAuth";
import { useBuyer } from "../components/Hooks/useBuyer";

const BuyerRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isBuyer, isBuyerLoading] = useBuyer()
    const location = useLocation()

    if(loading || isBuyerLoading){
        return <Loader/>
    }

    if(user && isBuyer){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default BuyerRoute;