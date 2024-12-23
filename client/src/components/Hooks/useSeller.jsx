import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import axios from "axios"


export const useSeller = () => {
    const { user } = useAuth()
    const { data: isSeller, isLoading: isSellerLoading } = useQuery({
        queryKey: ['seller', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/seller/${user.email}`)
            return res.data
        }
    })
    return [isSeller, isSellerLoading]
}