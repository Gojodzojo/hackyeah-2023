import express from 'express';
import cors from 'cors';
import { config as loadEnv } from 'dotenv';
import { login } from './endpoints/login';
import { register } from './endpoints/register';
import { token } from './endpoints/token';
import { API_PORT } from './constants';

interface EnvValues extends NodeJS.ProcessEnv {
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
}

loadEnv();
export const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env as EnvValues;

if (!(REFRESH_TOKEN_SECRET && ACCESS_TOKEN_SECRET)) {
    console.error('Token secrets are undefined');
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Api enpoints
app.post('/api/login', login);
app.put('/api/register', register);
app.post('/api/token', token);

app.listen(API_PORT, () => {
    console.log(`App listening on port ${API_PORT}`);
});