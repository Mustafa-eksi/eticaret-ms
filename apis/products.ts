const productsexp = require("express");
const productsapp = productsexp();

var cors = require('cors');
productsapp.use(cors({
    origin: ["localhost:3000", "localhost:3002"]
}))

productsapp.post("/add",);

productsapp.listen(3001 , () => {
    console.log(`[server]: product microservice is running at http://localhost:3001`);
});

export { productsapp }