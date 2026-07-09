import { Roles } from "./enums/roles"

export interface Users {
    user: string,
    password: string
    role: Roles
}
