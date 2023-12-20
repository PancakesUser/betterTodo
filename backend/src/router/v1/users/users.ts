import express from "express"
const router = express.Router()

interface user extends Express.User {
    user?:
    {
        id?: string,
        global_name?: string | null,
        avatar?: string | null
    }
}

router.get("/", (req: user, res: express.Response) => {
    if(req.user)
    {
        // Existe un usuario logueado para devolver.
        return res.status(200).send({id: req.user.id, global_name: req.user.global_name, avatar: req.user.avatar})
    }
    else
    {
        return res.status(404).send({error: "No user session was found!"})
    }
});

router.get("/logout", (req: express.Request, res: express.Response) => {
    if(req.user)
    {
        req.logout({keepSessionInfo: false}, function() {
          
            return res.status(200).send("done")
        })
    }
    else return res.status(404).send("Unauthorized!");
})

export {router as userRouter}