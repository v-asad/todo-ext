import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/login", usersController.login);
usersRouter.post("/signup", usersController.signup);

usersRouter.get("/", authenticateToken, usersController.getAll);
usersRouter.get("/:id", authenticateToken, usersController.getOne);
usersRouter.post("/", authenticateToken, usersController.create);
usersRouter.patch("/:id", authenticateToken, usersController.update);
usersRouter.delete("/:id", authenticateToken, usersController.delete);

export default usersRouter;
