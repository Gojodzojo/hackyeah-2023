import { writable, type Writable } from "svelte/store";
import { apiFetch } from "./apiFetch";

export interface AuthState {
    userData: any;
    token: string;
}

export const authStore: Writable<AuthState | "LOGGED_OUT" | "LOADING"> = writable("LOADING");

export function logout() {
    authStore.set("LOGGED_OUT");
    removeRefreshToken();
}

export async function tryLoginFromCookie() {
    const token = getToken();

    if (token === '') {
        logout();
        return;
    }

    const refResp = await apiFetch<any>('/user/details', 'GET', undefined, { authorization: `Bearer ${token}` });
    if ('status' in refResp) {
        logout();
        return;
    }

    authStore.set({ ...refResp, token });
}

export async function login(email: string, password: string) {
    const resp = await apiFetch<any>('/auth/login', 'POST', { email, password });

    if ("status" in resp) {
        throw resp;
    }
    authStore.set(resp);
    // removeRefreshToken();
    saveRefreshToken(resp.token);
}

export async function register(email: string, password: string) {
    const resp = await apiFetch<any>('/auth/register', 'POST', { email, password });

    if ("status" in resp) {
        throw resp;
    }
    authStore.set(resp);
    // removeRefreshToken();
    saveRefreshToken(resp.token);
}

function saveRefreshToken(token: string) {
    document.cookie = `refreshToken=${token}; max-age=31536000; path=/;`;
}

function removeRefreshToken() {
    document.cookie = "refreshToken=0; max-age=0; path=/;";
}

function getToken() {
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