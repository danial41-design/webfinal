import { loadEnv } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

loadEnv();
await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
