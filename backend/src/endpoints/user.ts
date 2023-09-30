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



router.post("/course", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
        return;
    }

    await database.course.create({
        data: {
            authorId: req.user.id,
            name: req.body.name,
            description: req.body.description,
        },
    });

    res.end();
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

router.put("/course/:id", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
        return;
    }

    await database.course.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: req.body.name,
            description: req.body.description,
        },
    });

    res.end();
});



router.post("/course/:id/lesson", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
    }

    await database.lesson.create({
        data: {
            courseId: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
        }
    });

    res.end();
});

router.get("/course/:id/lesson", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
    }

    const lessons = await database.lesson.findMany({
        where: {
            courseId: Number(req.params.id),
        },
    });

    res.send({
        status: 200,
        data: {
            lessons: lessons,
        }
    })
});

router.put("/course/:courseId/lesson/:lessonId", async (req: Request, res: Response) => {
    if (req.user == undefined) {
        res.status(403).end();
    }

    await database.lesson.update({
        where: {
            id: Number(req.params.lessonId),
        },
        data: {
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
        }
    })

    res.end();
});



export default router;

