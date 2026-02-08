import Task from "../models/Task.js";

export async function createTask(req, res, next) {
    try {
        const task = await Task.create({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json({ task });
    } catch (e) {
        next(e);
    }
}

export async function getMyTasks(req, res, next) {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ tasks });
    } catch (e) {
        next(e);
    }
}

