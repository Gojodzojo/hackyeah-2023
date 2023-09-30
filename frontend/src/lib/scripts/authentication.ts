import { writable, type Writable } from "svelte/store";
import { apiFetch } from "./apiFetch";
import type { UserData } from "backend/src/db";
import type { TokenLoginRequest, TokenLoginResponse } from "backend/src/endpoints/token";
import type { LoginRequest, LoginResponse } from "backend/src/endpoints/login";
import type { RegisterRequest, RegisterResponse } from "backend/src/endpoints/register";

export interface AuthState {
    userData: UserData;
    accessToken: string;
    refreshToken: string;
}

export const authStore: Writable<AuthState | "LOGGED_OUT" | "LOADING"> = writable("LOADING");

export function logout() {
    authStore.set("LOGGED_OUT");
    removeRefreshToken();
}

export async function tryLoginFromCookie() {
    const refreshToken = getRefreshToken();

    if (refreshToken === '') {
        logout();
        return;
    }

    const refResp = await apiFetch<TokenLoginResponse, TokenLoginRequest>('/api/token', 'POST', { refreshToken });

    if ('status' in refResp) {
        logout();
        return;
    }

    authStore.set({ ...refResp, refreshToken });
}

export async function login(email: string, password: string) {
    const resp = await apiFetch<LoginResponse, LoginRequest>('/auth/login', 'POST', { email, password });

    if (resp.status != 200) {
        throw resp
    }

    authStore.set(resp);
    // removeRefreshToken();
    saveRefreshToken(resp.refreshToken);
}

export async function register(email: string, password: string) {
    const resp = await apiFetch<RegisterResponse, RegisterRequest>('/auth/register', 'POST', { email, password });

    if (resp.status != 200) {
        throw resp;
    }

    authStore.set(resp);
    // removeRefreshToken();
    saveRefreshToken(resp.refreshToken);
}

function saveRefreshToken(token: string) {
    document.cookie = `refreshToken=${token}; max-age=31536000; path=/;`;
}

function removeRefreshToken() {
    document.cookie = "refreshToken=0; max-age=0; path=/;";
}

function getRefreshToken() {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
