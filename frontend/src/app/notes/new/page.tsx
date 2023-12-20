'use client';
import React from "react"
import { isLogged } from "@/app/utils/api";
import { Authentication, NewNote } from "@/components"
import { useRouter } from "next/navigation";

export default function CreateNotePage()
{
    const router = useRouter();

    React.useEffect(() => {
       if(!isLogged) return router.replace("/");
    }, []);



    return(
        <Authentication>
            <div className="flex flex-col justify-center items-center mt-[15%]">
              <NewNote/>
            </div>
        </Authentication>
    )
}