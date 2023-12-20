'use client';
import React from "react"
import { Navbar } from '@/components'
import { userContext } from "./context/userContext"
import { getUser } from "./utils/api";
import { TUser } from "@/interfaces/IUser";

interface props_Perks
{
  perks: Array<{id: number, title: string, description: string, image: string | null}>
}


export default function Home() {
  const {userData, setUserData} = React.useContext(userContext); 

  const perks = [
    {
      id: 1,
      title: "Seguridad",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, temporibus omnis tempora aliquid quasi corrupti asperiores odit culpa earum molestias!",
      image: null
    },
    {
      id: 2,
      title: "Interfaz Sencilla",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, temporibus omnis tempora aliquid quasi corrupti asperiores odit culpa earum molestias!",
      image: null
    },
    {
      id: 3,
      title: "Rapidez",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, temporibus omnis tempora aliquid quasi corrupti asperiores odit culpa earum molestias!",
      image: null
    }
  ]


  

  return (
    <main>
      <header className="w-full min-h-[250px] bg-[#79869b]">
        <Navbar user={userData}/>
        <div className="py-20 flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold">Crea <span className="text-cyan-300 font-bold">Notas</span>, <span className="text-white font-bold">guardalas</span> o <span className="text-white font-bold">editalas!</span></h1>
          <button className="border-gray-300 border-2 text-white font-bold rounded-sm px-5 py-2 transition-all ms-3 hover:-translate-y-2 hover:bg-black hover:text-white">Comienza</button>
        </div>
      </header>
      <section className="m-10">
        <RenderPerks perks={perks}/>
      </section>
    </main>
  )
}


const RenderPerks: React.FC<props_Perks> = ({perks}) => {
  if(perks && perks.length > 0)
  {
    return(
      <div className="flex flex-row justify-between items-center gap-5">
        {perks.map((perk) => {
          return(
            <div className="bg-gray-500 shadow-lg rounded-md p-2" key={perk.id}>
              <h1 className="text-center font-bold text-lg">{perk.title}</h1>
              <hr/>
              <div className="max-w-[250px]">
                <p className="text-lg">{perk.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}