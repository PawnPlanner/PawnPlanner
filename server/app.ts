import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import logger from "./middlewares/logger";

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);


const port = process.env.PORT || "8080";


app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});