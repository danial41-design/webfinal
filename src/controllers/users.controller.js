import User from "../models/User.js";

export async function getProfile(req, res) {
    res.json({ user: req.user });
}

export async function updateProfile(req, res, next) {
    try {
        const updates = req.body;

        delete updates.role;
        delete updates.passwordHash;

        if (updates.email) {
            const exists = await User.findOne({ email: updates.email });
            if (exists && String(exists._id) !== String(req.user._id)) {
                return res.status(400).json({ message: "Email already used" });
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
            .select("-passwordHash");

        res.json({ user });
    } catch (e) {
        next(e);
    }
}
