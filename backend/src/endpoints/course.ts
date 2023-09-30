import type { Request, Response } from "../types/express"
import express from "express";
import userValidator from "../middlewares/userValidator";
import database from "../utils/database";

const router = express.Router();

router.use(userValidator);

router.get("/", async (req: Request, res: Response) => {
    const courses = await database.course.findMany();

    res.send({
        status: 200,
        data: {
            courses: courses,
        }
    })
});

router.post("/:id/message", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
        return;
    }

    await database.message.create({
        data: {
            courseId: Number(req.params.id),
            authorId: req.user.id,
            content: req.body.content,
        }
    });

    res.end();
});

router.get("/:id/message", async (req: Request, res: Response) => {
    const messages = await database.message.findMany({
        where: {
            courseId: Number(req.params.id),
        },
    });

    res.send({
        status: 200,
        data: {
            messages: messages
        }
    });
});

export default router;

