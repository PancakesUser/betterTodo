import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/utils/api";
import { userContext } from "@/app/context/userContext";

export const Authentication: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const {userData, setUserData} = React.useContext(userContext);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean | undefined>(undefined);
  const [redirecting, setRedirecting] = useState(false);
  const loginURL = "http://localhost:3001/api/v1/auth/discord";
  

    function checkUser()
    {
     getUser()
     .then((results) => {
        if(results.status === 200)
        {
            if(!userData) {
                setUserData(results.data);
            }
        }
     })
     .catch((err) => {
         setRedirecting(true);
         setUserData(null);
         throw new Error(`Error checking user data!`);
     })
    }
  

  React.useEffect(() => {
    checkUser();
  }, []);

  if (redirecting) {
    router.replace(loginURL);
    return null; 
  }

  return <>{children}</>;
};
