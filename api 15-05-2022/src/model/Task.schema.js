import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 100,
		},
		hr: {
			type: Number,
			required: true,
			default: 0,
		},
		taskType: {
			type: String,
			default: "taskList",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Task", TaskSchema); // tasks
