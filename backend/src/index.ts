import express from "express";

import auth from "./endpoints/auth";
import user from "./endpoints/user";
import course from "./endpoints/course";

const PORT = 3000;

const app = express();

app.use(express.json())

app.use("/auth", auth);
app.use("/user", user);
app.use("/course", course);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

