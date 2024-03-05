/*const redis = require("redis");
const client = redis.createClient();*/
const server = require("./api/server");
const { PORT } = require("./config/config");

server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
