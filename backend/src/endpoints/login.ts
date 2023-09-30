import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index";
import { StatusResponse, Request, Response } from "../helperTypes";
import { compare } from "bcrypt";
import { UserData, fakeUserDB } from "../db";
import { sign } from "jsonwebtoken";

export type LoginRequest = {
    username: string;
    password: string;
};

export const WRONG_USERNAME = 'Wrong username';
export const WRONG_PASSWORD = 'Wrong password';
export type LoginResponse = StatusResponse<typeof WRONG_USERNAME | typeof WRONG_PASSWORD> | {
    userData: UserData;
    refreshToken: string;
    accessToken: string;
};

export async function login(req: Request<LoginRequest>, res: Response<LoginResponse>) {
    const { username, password } = req.body;

    const user = fakeUserDB.find(({ userData }) => userData.username === username);
    if (!user) {
        res.status(401).json({ status: WRONG_USERNAME });
        return;
    }

    const isPasswordCorrect = await compare(password, user.hashedPassword);
    if (!isPasswordCorrect) {
        res.status(401).json({ status: WRONG_PASSWORD });
        return;
    }

    const accessToken = sign({ id: user.userData.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = sign({ id: user.userData.id }, REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

    res.status(200).json({ accessToken, refreshToken, userData: user.userData });
}