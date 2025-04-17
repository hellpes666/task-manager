import mongoose, { Model, Schema } from "mongoose";

interface ITask {
	title: string;
	statusId: Schema.Types.ObjectId;
	startedDate: Date;
	deadline: Date;
	priorityId: Schema.Types.ObjectId;
	description: string;
	creatorId: Schema.Types.ObjectId;
	assignedToIds: Array<Schema.Types.ObjectId>;
}
type TaskModel = Model<ITask>;

const taskSchema = new Schema<ITask, TaskModel>(
	{
		title: { type: String, required: true },
		statusId: {
			type: Schema.Types.ObjectId,
			ref: "TaskStatus",
			required: true,
		},
		startedDate: { type: Date },
		deadline: { type: Date },
		priorityId: {
			type: Schema.Types.ObjectId,
			ref: "TaskPriority",
			required: true,
		},
		description: { type: String },
		creatorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignedToIds: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

export const Task = mongoose.model<ITask, TaskModel>("Task", taskSchema);
