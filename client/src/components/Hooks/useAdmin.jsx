import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useAdmin = () => {
    const { user } = useAuth();
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['Admin', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/admin/${user.email}`)
            return res.data
        }
    })
    return [isAdmin, isAdminLoading]
}


