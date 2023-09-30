import express from "express";
import database from "../utils/database";
import token from "../utils/token";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    await database.user.create({ data: { email, password } });

    res.send({
        status: 200,
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await database.user.findUnique({
        where: {
            email: email
        }
    });

    if (user === null) {
        res.status(404).end();
        return;
    }

    if (user.password !== password) {
        res.status(404).end();
        return;
    }

    const userToken = token.generate(user);

    res.send({
        status: 200,
        data: {
            token: userToken,
        },
    });
});

export default router;

