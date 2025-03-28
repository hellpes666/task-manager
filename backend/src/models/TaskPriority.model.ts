import { model, Model, Schema } from "mongoose";

interface ITaskPriority {
	name: string;
	color: string
}
type TaskPriorityModel = Model<ITaskPriority>;

const TaskPrioritySchema = new Schema<ITaskPriority, TaskPriorityModel>(
	{
		name: { type: String, required: true },
		color: {type: String, default: '#666666'}
	},
	{ timestamps: true }
);

export const TaskPriority: TaskPriorityModel = model<
	ITaskPriority,
	TaskPriorityModel
>("TaskPriority", TaskPrioritySchema);
