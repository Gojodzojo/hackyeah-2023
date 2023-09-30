import express from "express";
import userValidator from "../middlewares/userValidator";
import type { Request, Response } from "../types/express"
import database from "../utils/database";

const router = express.Router();

router.use(userValidator);

router.get("/details", (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
        return;
    }

    res.send({
        status: 200,
        data: { ...req.user, password: undefined, courses: undefined },
    });
});

router.get("/course", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
        return;
    }

    const userCourses = await database.course.findMany({
        where: {
            authorId: req.user.id,
        }
    })

    res.send({
        status: 200,
        data: {
            courses: userCourses,
        },
    });
});

export default router;

