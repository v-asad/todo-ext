import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/login", usersController.login);
usersRouter.post("/signup", usersController.signup);

// Protect all routes below
usersRouter.use(authenticateToken);

usersRouter.get("/", usersController.getAll);
usersRouter.get("/:id", usersController.getOne);
usersRouter.post("/", usersController.create);
usersRouter.patch("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

export default usersRouter;
