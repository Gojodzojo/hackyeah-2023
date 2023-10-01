import express from "express";
import database from "../utils/database";
import token from "../utils/token";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        await database.user.create({ data: { email, password } });
    } catch(e) {
        res.status(400).send({ status: 400 });
        return;
    }

    const user = await database.user.findUnique({
        where: {
            email: email
        }
    });

    const userToken = token.generate(user!);

    res.status(200).json({
        user,
        token: userToken,
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
        res.status(402).send({ status: 402 });
        return;
    }

    if (user.password !== password) {
        res.status(401).send({ status: 402 });
        return;
    }

    const userToken = token.generate(user);

    res.status(200).json({
        user,
        token: userToken,
    });
});

export default router;

