import express from "express"
import noteSchema from "../../../database/Schemas/noteSchema";

interface User extends Express.User {
    user?: {
        id?: string
    }
}

const router = express.Router();

router.get("/", async (req: User, res: express.Response) => {
    if(req.user)
    {
        const user_notes = await noteSchema.find({uid: req.user.id}).exec();;
        if(user_notes.length > 0) 
        {
            return res.status(200).send(user_notes);
        }
        else
        {
            return res.status(404).send("No notes were found!")
        }
    }
    else
    {
        return res.status(404).send({error: "Unathorized."})
    }
});

router.post("/upload", async (req: express.Request, res: express.Response) => {
    if(req.user)
    {
        const {uid, title, description, date} = req.body;
        if(!uid) return res.status(404).send({error: "UID was not provided!"});
        if(!title) return res.status(404).send({error: "Title was not provided!"});

        if(uid && title)
        {
            try{
                await new noteSchema({
                    uid,
                    title,
                    description,
                    date: Date.now()
                }).save();
                return res.status(201).send("Created!");
            }
            catch(err: any)
            {
                 res.status(500).send("Internal Server Error!");
                 throw new Error("Error creating new note: "+err);
            }
        }
    }else return res.status(404).send({error: "Unathorized."})
});

router.post("/update", async (req: express.Request, res: express.Response) => {
    const { nid, newTitle, newDescription, isCompleted } = req.body;

    try {
        const note = await noteSchema.findOne({ nid }).clone();
    
        if (req.user) {
            if (note) {
                note.title = newTitle;
                note.description = newDescription;
                note.completed = isCompleted;
                await note.save();
                return res.status(200).json({ message: "Note updated successfully" });
            } else {
                return res.status(200).json({ message: "Note not found" });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
});


router.post("/delete", async (req: express.Request, res: express.Response) => {
    if(req.user)
    {
        const {nid} = req.body;
        try{
            await noteSchema.findOneAndDelete({nid}).exec();
            return res.status(200).send("Done!");
        }catch(err)
        {
            console.log(`Error deleting a note: ${err}`);
            return res.status(500).send("INTERNAL ERROR!");
        }
    }
    else return res.status(404).send("Unauthorized.");
})

export {router as noteRouter}