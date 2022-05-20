import express from "express";
import {
	insertTask,
	readTasks,
	deleteTask,
	deleteMultipleTasks,
} from "../model/Task.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
	const result = await readTasks();
	console.log(result);
	res.json({
		status: "success",
		result,
	});
});

router.post("/", async (req, res) => {
	const result = await insertTask(req.body);

	result?._id
		? res.json({
				status: "success",
				message: "Task has been added successfully",
		  })
		: res.json({
				status: "error",
				message: "Unable to insert task, please try again",
		  });
});

// router.delete("/:_id", async (req, res) => {
router.delete("/", async (req, res) => {
	const { ids } = req.body;

	const result = await deleteMultipleTasks(ids);
	console.log(result);
	res.json({
		message: "Hello delete response",
		result,
	});
});

export default router;
