'use client';
import React from "react"
import { useRouter } from "next/navigation"
import { userContext } from "@/app/context/userContext";
import Link from "next/link";
import { uploadNote } from "@/app/utils/api";

// ... (imports remain unchanged)

export const NewNote: React.FC<any> = () => {
    const router = useRouter();
    const { userData } = React.useContext(userContext);
    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const userNotesRoute = `/${userData?.id}/notes`;
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (e.target.id === "title") {
        setTitle(value);
      } else if (e.target.id === "description") {
        setDescription(value);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await uploadNote(`${userData?.id}`, title, description);
        router.replace(userNotesRoute);
      } catch (err) {
        console.error(err);
      }
    };
  
    React.useEffect(() => {
      if (!userData) router.push("/");
    }, [userData, router]);
  
    return (
      <form className="bg-white shadow-md rounded-md max-w-[250px] p-2" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-nowrap gap-1 text-center">
          <h1 className="text-center">New Note</h1>
          {/* Cancel Interaction */}
          <Link href={userNotesRoute} className="text-red-500 px-5 rounded-sm underline">
            Cancel
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-2">
          {/* Title */}
          <label htmlFor="title" className="text-blue-400 text-sm">
            Title
          </label>
          <input
            onChange={handleChange}
            className="outline-none mb-2 focus:border-blue-400 focus:border-[2px] focus:rounded-sm focus:shadow-md"
            type="text"
            id="title"
            name="title"
            placeholder="An awesome title!"
            minLength={1}
            maxLength={23}
            required
          />
          {/* Description */}
          <label htmlFor="description" className="text-blue-400 text-sm">
            Description
          </label>
          <input
            onChange={handleChange}
            className="outline-none mb-2 focus:border-blue-400 focus:border-[2px] focus:rounded-sm focus:shadow-md"
            type="text"
            id="description"
            name="description"
            placeholder="An awesome description!"
            minLength={1}
            maxLength={300}
          />
          {/* Submit */}
          <input
            className="bg-blue-500 text-white rounded-sm shadow-sm w-full py-1 transition-all hover:shadow-lg hover:transform hover:scale-[1.03]"
            type="submit"
            value="Create"
          />
        </div>
      </form>
    );
  };
  