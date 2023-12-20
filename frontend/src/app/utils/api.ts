import axios from "axios"
import { useRouter } from "next/navigation";
axios.defaults.baseURL = "http://localhost:3001/api/v1";

async function getUser()
{
    const User = await axios(
        {
            method: "GET",
            url: "/users",
            withCredentials: true
        }
    )

    return User;
}


async function getNotesFromUser()
{
    const notes = await axios({
        method: "GET",
        url: "/notes/",
        withCredentials: true,
    });

    return notes;
}

async function isLogged()
{
    const user = await axios({
        method: "GET",
        url: "/users",
        withCredentials: true,

    });

    if(user.status === 200 && user.data){
        return true;
    }
    else
    {
        if(window.localStorage.getItem("user")) {
            window.localStorage.removeItem("user");
        }
        return false;
    }
}


async function logout()
{

    await axios({
        method: "GET",
        url: "/users/logout",
        withCredentials: true
    })
    .then((results) => {
        if(results.status === 200)
        {
            window.location.href = "/"
        }
    })
}

// API RELATED TO NOTES
async function uploadNote(uid: string, title: string, description: string)
{
    const upload = await axios({
        method: "POST",
        url: "/notes/upload",
        withCredentials: true,
        data: {
            uid,
            title,
            description,
        }
    });

    return upload;
}


async function editNote(nid: string, newTitle: string, newDescription: string, isCompleted: boolean)
{
    if(!nid) {throw new Error("NO _NID_ WAS PROVIDED!")};
    
     const results = await axios({
      method: "POST",
      url: "/notes/update",
      data: {nid, newTitle, newDescription, isCompleted},
      withCredentials: true
    });

    return results;
}


async function deleteNote(nid: string)
{
    const results = await axios({
        method: "POST",
        url: "/notes/delete",
        withCredentials: true,
        data: {nid}
    });

    return results;
}


export
{
    getUser,
    getNotesFromUser,
    isLogged,
    uploadNote,
    editNote,
    deleteNote,
    logout
}