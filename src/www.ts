import app from "./app";
import http from "http";

import config from "./config";

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log("running server");
});
