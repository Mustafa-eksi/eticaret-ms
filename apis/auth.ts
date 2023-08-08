import { authLogin, authRegister } from "./controllers/auth";
const Session = require('express-session') //Express session manager
const MongoStore = require('connect-mongo') //Session manager for MongoDB, Express
const authexp = require("express");
const authapp = authexp();

authapp.use(
    Session({
        name: 'PROJECT_PHPSESSID',
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/eticaret" }),
        secret: "secretkeyuwuOwO",
        saveUninitialized: false,
        resave: false
    })
)

authapp.use(authexp.json())

var cors = require('cors');
authapp.use(cors({
    origin: ["localhost:3001", "localhost:3002"]
}))

authapp.post("/login", authLogin);
authapp.post("/register", authRegister);

authapp.listen(3000 , () => {
    console.log(`[server]: auth microservice is running at http://localhost:3000`);
});

export { authapp }