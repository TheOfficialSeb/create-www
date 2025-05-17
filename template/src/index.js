const styrene = require("styrene");
const path = require("path");

const server = new styrene.Server({
    "staticDirectory": path.resolve(__dirname, "../client/dist/")
})

server.httpServer.listen(3000, () => {
    let addr = server.httpServer.address()
    console.log(`Listening on http://localhost:${addr.port}`);
});
