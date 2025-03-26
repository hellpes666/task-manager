import { model, Model, Schema } from "mongoose";

interface IUser {
	fullName: string;
	email: string;
	password: string;
	profilePicture?: String; //TODO Изменить, если потребуется
}
type UserModel = Model<IUser>;

//TODO: method assigned to;
//? https://dev.to/ghostaram/how-to-create-mongoose-models-using-typescript-7hf?ysclid=m8q5o2r2k9429257050

const userSchema = new Schema<IUser, UserModel>({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	profilePicture: { type: String, required: true },
});

export const User: UserModel = model<IUser, UserModel>("User", userSchema);
