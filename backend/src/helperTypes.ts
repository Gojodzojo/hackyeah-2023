import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import type { Send, Query, ParamsDictionary } from 'express-serve-static-core';

export interface Request<
    BodyType = {},
    QueryType extends Query = {},
    ParamsType extends ParamsDictionary = {}
> extends ExpressRequest {
    body: BodyType;
    params: ParamsType;
    query: QueryType;
}

export interface Request<
    BodyType = {},
    QueryType extends Query = {},
    ParamsType extends ParamsDictionary = {}
> extends ExpressRequest {
    body: BodyType;
    params: ParamsType;
    query: QueryType;
}

export const BAD_ACCESS_TOKEN = 'Bad access token';

export type ProtectedRequest<Req> = Req & {
    accessToken: string;
};

export interface Response<ResBody = never> extends ExpressResponse {
    json: Send<ResBody, this>;
}

export type StatusResponse<T extends string> = {
    status: T;
};