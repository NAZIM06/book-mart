import { Navigate, useLocation } from "react-router-dom"
import Loader from "../pages/Shared/Loader"
import { useAuth } from "../components/Hooks/useAuth"
import { useSeller } from "../components/Hooks/useSeller"


const SellerRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isSeller, isSellerLoading] = useSeller()
    const location = useLocation()

    if(loading || isSellerLoading){
        return <Loader/>
    }

    if(user && isSeller){
        return children
    }
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
}

export default SellerRoute;
