import type { Request, Response } from "../types/express"
import express from "express";
import userValidator from "../middlewares/userValidator";
import database from "../utils/database";

const router = express.Router();

router.use(userValidator);

router.get("/", async (req: Request, res: Response) => {
    const courses = await database.course.findMany();

    res.status(200).json({
        courses: courses,
    })
});

router.post("/", async (req: Request, res: Response) => {
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

    res.send({ status: 200 });
});

router.put("/:id", async (req: Request, res: Response) => {
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

    res.send({ status: 200 });
});

router.post("/:id/lesson", async (req: Request, res: Response) => {
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

    res.send({ status: 200 });
});

router.put("/:courseId/lesson/:lessonId", async (req: Request, res: Response) => {
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

    res.send({ status: 200 });
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

    res.send({ status: 200 });
});

router.get("/:id", async (req: Request, res: Response) => {
    const course = await database.course.findUnique({
        where: {
            id: Number(req.params.id),
        },
        include: {
            lessons: true,
        },
    });

    res.send({
        status: 200,
        data: {
            course: course,
        }
    })
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
            messages: messages.map((message) => ({ ...message, self: Number(req.user?.id) === message.authorId }))
        }
    });
});

export default router;

