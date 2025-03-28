import { model, Model, Schema } from "mongoose";

export interface IUser {
	_id: string
	name: string;
	lastName: string;
	email: string;
	password: string;
	profilePicture?: String; //TODO Изменить, если потребуется
}
type UserModel = Model<IUser>;

//TODO: method assigned to;
//? https://dev.to/ghostaram/how-to-create-mongoose-models-using-typescript-7hf?ysclid=m8q5o2r2k9429257050

const userSchema = new Schema<IUser, UserModel>(
	{
		name: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		profilePicture: { type: String },
	},
	{ timestamps: true }
);

export const User: UserModel = model<IUser, UserModel>("User", userSchema);
