import cors from 'cors';
import express from 'express'; 
import db from './src/db';
import routes from './src/routes'; 
import path from "path";

db.connect();
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(cors());
}
app.get('/', function(req, res) {
    res.send({ message: "Hello from the server!" }).status(200);
});
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
const port = process.env.PORT || 4000;
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);
app.use(cors());
app.use(express.json());
app.use('/', routes);