import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { getProfile, updateProfile } from "../controllers/users.controller.js";
import { updateProfileSchema } from "../validation/user.validation.js";

const router = Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, validate(updateProfileSchema), updateProfile);

export default router;
