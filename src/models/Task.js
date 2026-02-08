import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true, maxlength: 80 },
        description: { type: String, default: "", trim: true, maxlength: 500 },
        status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
        dueDate: { type: Date, default: null }
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
