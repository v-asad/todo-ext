import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/login", usersController.login.bind(usersController));
usersRouter.post("/signup", usersController.signup.bind(usersController));

// Protect all routes below
usersRouter.use(authenticateToken);

usersRouter.get("/", usersController.getAll.bind(usersController));
usersRouter.get("/:id", usersController.getOne.bind(usersController));
usersRouter.post("/", usersController.create.bind(usersController));
usersRouter.patch("/:id", usersController.update.bind(usersController));
usersRouter.delete("/:id", usersController.delete.bind(usersController));

export default usersRouter;
