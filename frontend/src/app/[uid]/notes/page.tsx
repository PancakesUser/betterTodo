'use client';
import React from "react"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"
import { getNotesFromUser, getUser } from "@/app/utils/api";
import { userContext } from "@/app/context/userContext";
import { TNote } from "@/interfaces/INotes";
import { Authentication, Notes } from "@/components";
// Components
import { Navbar } from "@/components";


export default function NotesPage()
{
 
    const router = useRouter();
    const {userData} = React.useContext(userContext);

    return(
        <Authentication>
            <div className="w-full h-full">
                <Navbar user={userData}/>
                <div className="mt-5 w-full text-center">
                    <button
                    onClick={() => {router.replace("/notes/new")}}
                    className="border-white border-2 text-white px-4 py-2 shadow-sm rounded-sm hover:animate-pulse transition-all duration-[2] hover:transform hover:scale-[1.11] hover:border-cyan-500 hover:text-cyan-400 hover:shadow-lg"
                    >Create New
                    </button>
                </div>
                <div className="mx-10">
                  <Notes/>
                </div>
        </div>
        </Authentication>
    )
}