import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index";
import { UserData, fakeUserDB } from "../db";
import { StatusResponse, Request, Response } from "../helperTypes";

const SALT_ROUNDS = 10;

export type RegisterRequest = {
    username: string;
    password: string;
};

export const USRNM_PSW_SPECIFIED = 'username and password must be specified';
export const USR_EXISTS = 'User already exists';
export type RegisterResponse = StatusResponse<typeof USRNM_PSW_SPECIFIED | typeof USR_EXISTS> | {
    userData: UserData;
    refreshToken: string;
    accessToken: string;
};

export async function register(req: Request<RegisterRequest>, res: Response<RegisterResponse>) {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        res.status(409).json({ status: USRNM_PSW_SPECIFIED });
        return;
    }

    if (fakeUserDB.some(({ userData }) => userData.username === username)) {
        res.status(405).json({ status: USR_EXISTS });
        return;
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);

    let id = 0;
    while (true) {
        id = Math.round(Math.random() * 10000) % 10000;
        if (!fakeUserDB.some(({ userData }) => userData.id === id)) break;
    }

    const userData: UserData = {
        id,
        username
    };

    fakeUserDB.push({ hashedPassword, userData });

    const accessToken = sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

    res.json({ accessToken, refreshToken, userData });
}