import { model, Model, Schema } from "mongoose";

interface ITaskStatus {
	name: string;
}
type TaskStatusModel = Model<ITaskStatus>;

const taskStatusSchema = new Schema<ITaskStatus, TaskStatusModel>(
	{
		name: { type: String, required: true },
	},
	{ timestamps: true }
);

export const TaskStatus: TaskStatusModel = model<ITaskStatus, TaskStatusModel>(
	"TaskStatus",
	taskStatusSchema
);
