import express from "express"
import session from "express-session"
import passport from "passport"
import cors from "cors"
import morgan from "morgan"
import { mainRouter } from "./router/router"
import "dotenv/config"
import "./database/connection";



const app = express();
var port = 3001 || process.env.PORT;


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: "qwerty",
    cookie: {
        secure: false,
        maxAge: 864e+7
    }
}));
console.log(process.env.CLIENTID)
app.use(passport.session());
// 
app.use("/api", mainRouter);
app.listen(port);

export {passport as passportManager}