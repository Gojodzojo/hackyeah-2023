import { get } from 'svelte/store';
import { authStore } from './authentication';
import { API_PORT } from 'backend/src/constants';

const API_BASE = import.meta.env.DEV ? `http://localhost:${API_PORT}` : '';

export const NO_CONNECTION_TO_SERVER = 'No connection to server';
export const UNAUTHORISED_USER = 'Unauthorised user';

export async function apiFetch<Resp extends object, Req extends object = object>(url: string, method: string, body?: Req): Promise<Resp | { status: string }> {
	try {
		const resp = await fetch(API_BASE + url, {
			method,
			body: body ? JSON.stringify(body) : undefined,
			referrerPolicy: 'same-origin',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' }
		});
		return await resp.json();
	} catch (e) {
		return { status: NO_CONNECTION_TO_SERVER };
	}
}

export async function protectedApiFetch
	<Resp extends object, Req extends object = object>
	(url: string, method: string, body?: Req):
	Promise<Resp | { status: string }> {
	const auth = get(authStore);

	if (typeof auth === 'string') return { status: UNAUTHORISED_USER };
	const { accessToken } = auth;

	const b = body ? body : {};
	return await apiFetch(url, method, { accessToken, ...b });
}
