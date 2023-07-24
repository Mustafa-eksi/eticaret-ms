const userexp = require("express");
const userapp = userexp();

var cors = require('cors');
userapp.use(cors({
    origin: ["localhost:3000", "localhost:3001"]
}))

userapp.post("/login");

userapp.listen(3002, () => {
    console.log(`[server]: user microservice is running at http://localhost:3002`);
});

export { userapp }