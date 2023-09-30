import { sign, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index";
import { Request, Response, StatusResponse } from "../helperTypes";
import { UserData, fakeUserDB } from "../db";

export type TokenLoginRequest = {
    refreshToken: string;
};

export const BAD_REFRESH_TOKEN = 'Bad refresh token';
export const USR_NOT_EXISTS = 'User does not exist';
export type TokenLoginResponse = StatusResponse<typeof BAD_REFRESH_TOKEN | typeof USR_NOT_EXISTS> | {
    userData: UserData;
    accessToken: string;
};

export function token(req: Request<TokenLoginRequest>, res: Response<TokenLoginResponse>) {
    const { refreshToken } = req.body;

    verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, payload) => {
        if (err || !payload || typeof payload === 'string') {
            res.status(401).json({ status: BAD_REFRESH_TOKEN });
            return;
        }

        const { id } = payload;
        const user = fakeUserDB.find(({ userData }) => userData.id === id);

        if (!user) {
            res.status(401).json({ status: USR_NOT_EXISTS });
            return;
        }

        const accessToken = sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.status(200).json({ accessToken, userData: user.userData });
    });
}