import mongoose from "mongoose";

(() => {
 try{
    mongoose.connect(`mongodb+srv://hyzun:ZvFyYFSVVB2d4rgj@cluster0.gdlc1pk.mongodb.net/`)
    .catch((err) => {console.log(err)});
    console.log("Database Connected. ✅")
 }catch(err: any) {
    if(err) throw new Error(`Database Connection Error: ${err}`);
 } 
})();