import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    };
    const googleSignInUser = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };
    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    };
// Update user profile function
const updateUserProfile = ({ displayName, email, photoURL }) => {
    return updateProfile(auth.currentUser, {
        displayName,
        photoURL
    }).then(() => {
        // Optionally, you might want to update the email separately
        if (email && email !== auth.currentUser.email) {
            return auth.currentUser.updateEmail(email);
        }
    }).then(() => {
        // Update local user state
        setUser({ ...auth.currentUser });
    });
};

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, { email: currentUser.email });
                    const token = response.data.token;
                    localStorage.setItem('access-token', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Add this line to set the authorization header
                } catch (error) {
                    console.log('Failed to obtain JWT token:', error);
                }
            } else {
                localStorage.removeItem('access-token');
                delete axios.defaults.headers.common['Authorization']; // Remove the authorization header
            }

            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        googleSignInUser,
        loading,
        setLoading,
        updateUser,
        updateUserProfile
        
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;