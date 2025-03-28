import mongoose, { Model, Schema } from "mongoose";

interface ITask {
	title: string;
	statusId: mongoose.Schema.Types.ObjectId;
	startedDate: Date;
	deadline: Date;
	priorityId: mongoose.Schema.Types.ObjectId;
	description: string;
	creatorId: mongoose.Schema.Types.ObjectId;
	assignedToIds: Array<mongoose.Schema.Types.ObjectId>;
}
type TaskModel = Model<ITask>;

const taskSchema = new Schema<ITask, TaskModel>(
	{
		title: { type: String, required: true },
		statusId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TaskStatus",
			required: true,
		},
		startedDate: { type: Date, required: true },
		deadline: { type: Date, required: true },
		priorityId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TaskPriority",
			required: true,
		},
		description: { type: String, required: true },
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignedToIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

export const Task = mongoose.model<ITask, TaskModel>("Task", taskSchema);
