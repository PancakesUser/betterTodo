'use client';
import React, { SetStateAction } from "react";
// Api
import {deleteNote, editNote, getNotesFromUser} from "@/app/utils/api";
import {TNote} from "@/interfaces/INotes";
import { userContext } from "@/app/context/userContext";





export const Notes: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [notes, setNotes] = React.useState<Array<TNote>>([]);
 
  

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const results = await getNotesFromUser();
        if (results.status === 200) {
          setNotes(results.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return <h1>Wait till data loads!</h1>;
  }

  return (
    <section className="flex flex-row flex-wrap justify-start gap-5 items-start mt-[5%]">
      <RenderNotes notes={notes} setNotes={setNotes} />
    </section>
  );
};


interface RenderNotes {
  notes: Array<TNote>;
  setNotes: React.Dispatch<SetStateAction<TNote[]>>;
}

const RenderNotes: React.FC<RenderNotes> = ({ notes, setNotes }) => {
  const [isEditingModeEnabled, setIsEditingModeEnabled] = React.useState(false);
  const [editingNID, setEditingNID] = React.useState<string>("");
  const [newTitle, setNewTitle] = React.useState<string>("");
  const [newDescription, setNewDescription] = React.useState<string>("");
  const [checkBoxValue, setcheckBoxValue] = React.useState<boolean>(false);
  const [deleteConfirmationButton, setDeleteConfirmationButton] = React.useState(false);
  const [deleteNID, setDeleteNID] = React.useState<string>("");
  const [hasChangedData, sethasChangedData] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.id == "title") {
      setNewTitle(e.target.value);
    }
    else if(e.target.id == "description")
    {
      setNewDescription(e.target.value)
    }
    else if(e.target.id == "checkbox")
    {
      setcheckBoxValue(!checkBoxValue);
    }
    sethasChangedData(true);
  };


  const handleEdit = (nid: string, currentTitle?: string, currentDescription?: string) => {
    setNewTitle(currentTitle || "");
    setNewDescription(currentDescription || "");
    setEditingNID(nid);
    setIsEditingModeEnabled(true);
  };

  const handleSave = async () => {
    console.log(editingNID, newTitle, newDescription, checkBoxValue);
    setIsEditingModeEnabled(false);
    if(hasChangedData)
    {
      editNote(editingNID, newTitle, newDescription, checkBoxValue);
      sethasChangedData(false);
    }
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.nid === editingNID ? { ...note, title: newTitle, description: newDescription, isCompleted: checkBoxValue } : note
      )
    );

    setcheckBoxValue(false);
  };

  const handleDeleteConfirmation = () => {
    deleteNote(deleteNID);
    setDeleteConfirmationButton(false);
    setNotes((prevNotes) => prevNotes.filter((note) => note.nid !== deleteNID));
    setDeleteNID("");
  };

  const handleDelete = (nid: string) => {
    setDeleteConfirmationButton(true);
    setDeleteNID(nid);
  };

  if (notes.length > 0) {
    return (
      <>
        {notes.map((note) => (
          <div className={`${note.isCompleted ? "bg-green-500" : "border-white"} border-[2px] w-[300px] rounded-sm`} key={note.nid}>
            {/* Buttons Side */}
            <div className="flex flex-row justify-between items-center w-full p-2 border-white border-b-2">
              {isEditingModeEnabled && note.nid === editingNID ? 
                <input
                id="checkbox"
                type="checkbox" 
                onChange={handleChange}
                checked={checkBoxValue}
                />
                :
                <input
               id="checkbox"
               type="checkbox" 
               onChange={handleChange}
               checked={note.isCompleted}
               />
              }
              <div className="flex flex-row flex-nowrap gap-2">
                {isEditingModeEnabled && note.nid === editingNID ? (
                  <button className="bg-green-400 font-bold shadow-sm px-5" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-green-400 font-bold shadow-sm px-5"
                    onClick={() => handleEdit(note.nid, note.title, note.description)}
                  >
                    Edit
                  </button>
                )}
                {deleteConfirmationButton && note.nid === deleteNID ? (
                  <button
                    className="bg-red-700 font-bold shadow-sm px-5"
                    onClick={handleDeleteConfirmation}
                  >
                    Confirm Delete
                  </button>
                ) : (
                  <button
                    className="bg-red-700 font-bold shadow-sm px-5"
                    onClick={() => handleDelete(note.nid)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            {/* Note items */}
            <div className="px-2">
              {/* Zona de editado para nuevo título y descripcion */}
              {isEditingModeEnabled && note.nid === editingNID ? (
                <input
                  id="title"
                  type="text"
                  minLength={1}
                  maxLength={23}
                  placeholder={note.title}
                  className="my-2 outline-none"
                  onChange={handleChange}
                />
              ) : (
                <h1 className="text-white">{note.title}</h1>
              )}
              {/* Description */}
              {isEditingModeEnabled && note.nid === editingNID ? (
                <textarea
                  id="description"
                  className="w-full"
                  contentEditable
                  maxLength={300}
                  onChange={handleChange}
                />
              ) : (
                <textarea className="w-full" value={note.description} disabled />
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
  return null;
};
