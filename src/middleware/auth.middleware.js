import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
    try {
        const header = req.headers.authorization || "";
        const [type, token] = header.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({ message: "Unauthorized: missing token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-passwordHash");

        if (!user) return res.status(401).json({ message: "Unauthorized: user not found" });

        req.user = user;
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized: invalid token" });
    }
}
