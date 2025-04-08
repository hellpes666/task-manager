export interface IUserData {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IAuthUser extends IUserData {
    _id: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}
