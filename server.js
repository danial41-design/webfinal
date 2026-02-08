import { loadEnv } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

try {
    loadEnv();
    await connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on :${PORT}`);
    });
} catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
}
