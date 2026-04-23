export type Roles = "ADMIN" | "USER";

export type User = {
    id       : number
    email    : string
    name     : string
    role     : Roles

    createdAt : Date | null
    updatedAt : Date | null
}