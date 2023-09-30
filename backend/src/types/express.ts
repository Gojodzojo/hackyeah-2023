import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { User } from "@prisma/client";

export interface Request extends ExpressRequest {
    user?: User;
}

export interface Response extends ExpressResponse {

}

export { NextFunction };

