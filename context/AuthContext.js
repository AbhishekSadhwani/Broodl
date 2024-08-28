'use client';
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useState, useEffect, createContext } from "react"


const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    // state to track the current user
    const [currentUser, setCurrentUser] = useState(null);
    // state to track the current user data
    const [userDataObj, setUserDataObj] = useState(null);

    // to track the loading
    const [loading, setLoading] = useState(true);


    // Auth Handlers

    // function to sign up
    function signUp(email,password) {
        return createUserWithEmailAndPassword(auth,email,password);
    }   

    // function to Login
    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    // function to logout
    function logout(){
        setCurrentUser(null);
        setUserDataObj(null);
        return signOut(auth);
    }

    useEffect(() => {
        // it checks the change in state of auth and handles it and if user is logged in then provides the user
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try{
                
                // set the logged in user to current user and if check if user exists
                setLoading(true);
                setCurrentUser(user);
                // if user doesn't exist end the function
                if(!user){
                    // console.log("No user Found");
                    return 
                }
                
                // if user exist then the fetch the user data from firestore database
                // console.log("fetching user data");
                const docRef = doc(db,'users',user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {}
                if (docSnap.exists()){
                    firebaseData = docSnap.data();
                }
                setUserDataObj(firebaseData);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        });
        return unsubscribe;
    },[])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signUp,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}