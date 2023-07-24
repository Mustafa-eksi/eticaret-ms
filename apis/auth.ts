import { authLogin } from "./controllers/auth";
const authexp = require("express");
const authapp = authexp();

var cors = require('cors');
authapp.use(cors({
    origin: ["localhost:3001", "localhost:3002"]
}))

authapp.post("/login", authLogin); // login

authapp.listen(3000 , () => {
    console.log(`[server]: auth microservice is running at http://localhost:3000`);
});

export { authapp }