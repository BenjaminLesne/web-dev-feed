import { createServer } from "http";
import { env } from "./env";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

const port = env.SERVER_PORT;
const hostname = env.HOSTNAME;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
