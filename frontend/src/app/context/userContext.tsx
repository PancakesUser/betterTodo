'use client';
import React, { SetStateAction } from "react"
import { TUser } from "@/interfaces/IUser";

interface props_context {
    userData: TUser | null,
    setUserData: React.Dispatch<SetStateAction<TUser | null>>
}

export const userContext = React.createContext<props_context>({userData: null, setUserData: () => {}});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userData, setUserData] = React.useState<TUser | null>(null);
   

    return(
       <userContext.Provider value={{userData, setUserData}}>
        {children}
       </userContext.Provider>
    )
}

