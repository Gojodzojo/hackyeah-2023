import express from "express";
import cors from 'cors';
import auth from "./endpoints/auth";
import user from "./endpoints/user";
import course from "./endpoints/course";
import asset from "./endpoints/asset";
import { API_PORT } from "./constants";

const app = express();

app.use(express.json())
app.use(cors());

app.use("/auth", auth);
app.use("/user", user);
app.use("/course", course);
app.use("/asset", asset);

app.listen(API_PORT, () => {
    console.log(`Server started at port ${API_PORT}`);
});

