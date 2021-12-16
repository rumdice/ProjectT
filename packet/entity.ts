export interface Entity {

}

export interface UserStatus extends Entity {
    name: string;
    level: number;
    lastLogin: Date;
    create: Date;
}