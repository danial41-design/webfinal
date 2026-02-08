import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTask, getMyTasks } from "../controllers/tasks.controller.js";
import { createTaskSchema } from "../validation/task.validation.js";

const router = Router();

router.post("/", auth, validate(createTaskSchema), createTask);
router.get("/", auth, getMyTasks);


export default router;
