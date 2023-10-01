import express from "express";
import multer from "multer";
import database from "../utils/database";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    if (req.file == undefined) {
        res.status(400).end();
        return;
    }

    const asset = await database.asset.create({
        data: {
            mimetype: req.file!.mimetype,
            data: req.file!.buffer,
        },
    });


    res.send({
        status: 200,
        data: {
            url: `/asset/${asset.id}`,
        },
    });
});

router.get("/:id", async (req, res) => {
    const image = await database.asset.findFirst({
        where: {
            id: Number(req.params.id),
        },
    });

    if (image == null) {
        res.status(404).end();
        return;
    }

    res.contentType("image/jpeg")
    res.send(image.data);
})

export default router;

