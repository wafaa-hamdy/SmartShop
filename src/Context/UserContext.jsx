import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [UserLogin, setUserLogin] = useState(null);


    useEffect(()=>{
        if(localStorage.getItem("UserToken")){
            setUserLogin(localStorage.getItem("UserToken"))
        }

    },[])

    return (
        <UserContext.Provider value={{ UserLogin, setUserLogin }}>
            {props.children}
        </UserContext.Provider>
    );
}
