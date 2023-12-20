import {Schema, model} from "mongoose"

interface User {
    id: string,
    global_name: string
    avatar: string
}

const User:Schema<User> = new Schema<User>({
    id: {type: String, required: true, unique: true},
    global_name: {type: String, required: true},
    avatar: {type: String, required: true, default: null}
});

export default model<User>("User", User);