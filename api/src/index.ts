import { AppServer } from "./app";

const server = new AppServer();
const port = 3000;

server.app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
