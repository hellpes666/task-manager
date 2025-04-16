import { model, Model, Schema } from "mongoose";

interface ITaskStatus {
	name: string;
	color: string;
}
type TaskStatusModel = Model<ITaskStatus>;

const taskStatusSchema = new Schema<ITaskStatus, TaskStatusModel>(
	{
		name: { type: String, required: true, unique: true },
		color: { type: String, default: "#666666" },
	},
	{ timestamps: true }
);

export const TaskStatus: TaskStatusModel = model<ITaskStatus, TaskStatusModel>(
	"TaskStatus",
	taskStatusSchema
);
