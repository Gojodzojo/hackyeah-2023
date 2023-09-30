import { Request, Response, NextFunction } from "../types/express";
import database from "../utils/database";
import token from "../utils/token";

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {

    let authorizationHeader = req.headers.authorization;

    if (authorizationHeader == undefined || !authorizationHeader?.startsWith("Bearer")) {
        return next();
    }

    const userToken = authorizationHeader.slice("Bearer ".length)
    const userTokenPayload = token.validate(userToken);

    if (userTokenPayload == undefined) {
        return next();
    }

    const user = await database.user.findUnique({
        where: {
            id: userTokenPayload.id,
        },
    });

    req.user = user ?? undefined;

    return next();
}

export default userValidator;

