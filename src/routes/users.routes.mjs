import { Router } from "express";
import usersControllers from "../controllers/users.controllers.mjs";
import { upload } from "../utils/uploadFiles.mjs";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.mjs";

const router = Router();

router.get(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  usersControllers.getAll,
);

router.get(
  "/:uid",
  passportCall("jwt"),
  authorization("admin"),
  usersControllers.getByID,
);

router.post("/premium/:uid", usersControllers.changeUserRole);

router.post(
  "/:uid/documents",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  upload.fields([
    { name: "document", maxCount: 3 },
    { name: "profile", maxCount: 1 },
    { name: "product", maxCount: 1 },
  ]),
  usersControllers.addDocuments,
);

router.delete(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  usersControllers.deleteInactiveUsers,
);

export default router;
