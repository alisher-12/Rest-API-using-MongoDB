import dal from "./2-utils/dal";
dal.connect();

import express from "express";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import productsController from "./6-controllers/products-controller";

const server = express();

server.use(express.json());
server.use("/api", productsController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
