import { Roles } from "./enums/roles"

export interface Users {
    id: number,
    user: string,
    password: string
    role: Roles
}
