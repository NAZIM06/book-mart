import { useContext } from "react"
import { AuthContext } from "../../provider/AuthProvider"

export const useAuth = () => {
    const { user, setUser, loading, setLoading, createUser, signInUser, googleSignInUser, signOutUser, updateUser } = useContext(AuthContext)
    return { user, setUser, loading, setLoading, createUser, signInUser, googleSignInUser, signOutUser, updateUser }
}