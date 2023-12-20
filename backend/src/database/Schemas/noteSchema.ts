import {Error, Schema, model} from "mongoose"
import {v4, validate} from "uuid"

interface Note
{
    nid: string
    uid: string
    title: string
    description: string
    date: Date,
    completed: boolean
}

const noteSchema: Schema<Note> = new Schema<Note>(
    {
        nid: {type: String, unique: true},
        uid: {type: String, required: true, unique: false},
        title: {type: String, required: true, minlength: 1, maxlength: 23},
        description: {type: String, required: false, maxlength: 300},
        date: {type: Date, required: true, default: Date.now()},
        completed: {type: Boolean, required: true, default: false}
    }
)

noteSchema.pre("save", async function(next) {
    if(this.nid && this.isNew)
    {
        const check = await validate(this.nid);

        if(!check) {
            next(new Error("Not valid nid!"))
        }
    }else{
        this.nid = await v4();
    }

    try{
        next();
    }catch(err: any)
    {   
        next(err);
    }
});

export default model("Notes", noteSchema);

