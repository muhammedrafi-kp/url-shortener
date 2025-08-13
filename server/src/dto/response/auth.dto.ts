import { IUser } from "../../models/user.model";

export class AuthDTo {
    public readonly _id: string;
    public readonly name: string;
    public readonly email: string;

    constructor(user: any) {
        this._id = user._id.toString();
        this.name = user.name;
        this.email = user.email;
    }

    public static from(user: IUser): AuthDTo {
        return new AuthDTo(user);
    }
}