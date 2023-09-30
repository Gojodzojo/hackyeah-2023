export interface UserData {
    username: string;
    id: number;
}

export interface UserDbEntry {
    userData: UserData;
    hashedPassword: string;
}

export const fakeUserDB: UserDbEntry[] = [];