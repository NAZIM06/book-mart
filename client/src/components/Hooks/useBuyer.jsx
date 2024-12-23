import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAuth } from "./useAuth"

export const useBuyer = () => {
    const { user } = useAuth()
    const { data: isBuyer, isLoading: isBuyerLoading } = useQuery({
        queryKey: ['buyer', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/buyer/${user.email}`)
            return res.data
        }
    })
    return [isBuyer, isBuyerLoading]
}