import { passportManager } from "../.."
import passportDiscord from "passport-discord"
import userSchema from "../../database/Schemas/userSchema";
import "dotenv/config";

interface profile extends passportDiscord.Profile {
    global_name?: string
}

interface user extends Express.User {
    _id?: string
}


async function createUser(id: string, global_name: string | undefined, avatar: string | null)
{
   const User = await new userSchema(
        {
            id,
            global_name,
            avatar
        }
    ).save();
    return User;
}

passportManager.serializeUser((user: user, done) => {
     return done(null, user._id)
});

passportManager.deserializeUser(async (_id: any, done) => {
   const User = await userSchema.findById({_id: _id}).clone();
   console.log(_id);
   if(User) 
   {
    return done(null, User);
   }
   else
   {
    return done("User doesn't exist!", false);
   }
})

passportManager.use("discord", new passportDiscord.Strategy({
    clientID: `${process.env.CLIENTID}`,
    clientSecret: `${process.env.CLIENTSECRET}`,
    callbackURL: `${process.env.CLIENTCALLBACK}`,
    scope: ["identify"]
}, async function (accessToken, refreshToken, profile: profile, done) {

    const {id, global_name, avatar} = profile;
    const user = await userSchema.findOne({id}).exec();

    if(user)
    {
        if(user.global_name != global_name && global_name)
        {
            user.global_name = global_name;
        }

        if(user.avatar != avatar && avatar)
        {
            user.avatar = avatar;
        }
        await user.save();
        return done(null, user);
    }
    else
    {
        try{
            const newUser = await createUser(id, global_name, avatar);
            console.log(newUser._id);
           return done(null, newUser);
        }catch(err: any)
        {
            if(err) 
            {
                done(err, false)
                throw new Error(`Error creating a new user. Error: ${err}`)
            }
        }
    }


}));

export {passportManager as passportDiscordMethod}
