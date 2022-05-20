import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

// connect to mongodb
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

//convert incoming json object and make it available in req object
app.use(express.json());
app.use(cors());

// Task api endpoints
import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
	res.json({
		message: "You have reached the not to do api server",
	});
});

app.listen(PORT, error => {
	error && console.log(error);

	console.log(`Server is running on http://localhost:${PORT}`);
});
