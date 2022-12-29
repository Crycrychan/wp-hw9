import cors from 'cors';
import express from 'express'; 
import db from './src/db';
import routes from './src/routes'; 

db.connect();
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);
app.use(cors());
app.use(express.json());
app.use('/api', routes);