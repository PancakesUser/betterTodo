'use client';
import React from "react"
import { useRouter, usePathname } from "next/navigation";
import { TUser } from "@/interfaces/IUser";
import { userContext } from "@/app/context/userContext";
import Link from "next/link";
import { logout } from "@/app/utils/api";




interface NavbarProps {
    user?: TUser | null;
  }
  
  export const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const router = useRouter();
    const loginURL = "http://localhost:3001/api/v1/auth/discord";
    const [displayMenu, setDisplayMenu] = React.useState<boolean>(false);
    const { userData } = React.useContext(userContext);
  
    const handleUserMenu = () => {
      setDisplayMenu(!displayMenu);
    };
  
    const handleLoginRedirect = () => {
      if (userData) {
        router.push(`/${userData.id}/notes`);
      } else {
        router.replace(loginURL);
      }
    };
  
    return (
      <div className={`bg-transparent w-full min-h-fit shadow-md ${displayMenu ? 'relative' : ''}`}>
        <nav className="flex flex-row justify-between items-center py-2 px-5">
          {/* Logo */}
          <img src="" alt="Logo" width={64} />
          {/* Urls */}
          <div>
            <ul className="flex flex-row flex-nowrap justify-between items-center gap-2 text-white text-md">
              <li className="hover:cursor-pointer" onClick={() => router.push("/")}>Home</li>
              <li>About</li>
            </ul>
          </div>
          {/* Login Button */}
          {userData ? (
            <>
              <div className="flex flex-col flex-nowrap items-center">
                <img
                  onClick={handleUserMenu}
                  className="rounded-full hover:cursor-pointer"
                  src={`https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}.png`}
                  alt="User Profile"
                  width={60}
                />
                <h1 className="text-white text-center text-sm font-bold">{userData?.global_name}</h1>
                <div
                  className={`bg-white shadow-md w-[105px] p-2 absolute right-1 top-[92%] ${
                    displayMenu ? 'visible' : 'hidden'
                  }`}
                >
                  <div className="flex flex-row flex-nowrap justify-between">
                    <h1 className="text-center text-md font-bold">Menu</h1>
                    <button onClick={handleUserMenu} className="text-sm font-bold">
                      X
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <Link href={`/${userData.id}/notes`} className="bg-blue-400 text-center rounded-sm">
                      My Notes
                    </Link>
                    <button className="bg-red-600 text-center rounded-sm" onClick={() => {logout()}}>Logout</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginRedirect}
                className="bg-blue-500 text-white py-2 px-4 rounded-sm"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </div>
    );
  };
  

