import { model, Model, Schema } from "mongoose";

interface ITaskPriority {
	name: string;
}
type TaskPriorityModel = Model<ITaskPriority>;

const TaskPrioritySchema = new Schema<ITaskPriority, TaskPriorityModel>({
	name: { type: String, required: true },
});

export const TaskPriority: TaskPriorityModel = model<
	ITaskPriority,
	TaskPriorityModel
>("TaskPriority", TaskPrioritySchema);
