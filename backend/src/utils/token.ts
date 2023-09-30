import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET = "secret";

export const generate = (user: Pick<User, "id">) => {
    return jwt.sign({ sub: user.id }, SECRET);
}

export const validate = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET);
        return { id: Number(decoded.sub) };
    } catch(e) {
        return undefined;
    }
}

const token = {
    generate,
    validate,
}

export default token;

