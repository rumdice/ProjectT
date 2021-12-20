export interface Entity {
    id: number;
}

export interface UserStatus extends Entity {
    name: string;
    level: number;
    lastLogin: Date;
    create: Date;
}

export interface Item extends Entity {
    name: string;
    level: number;
    grade: number;
    breakable: boolean;
}