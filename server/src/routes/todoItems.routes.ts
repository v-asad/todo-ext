import { Router } from "express";
import TodoItemsController from "../controllers/todoItems.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const todoItemsRouter = Router();
const todoItemsController = new TodoItemsController();

todoItemsRouter.use(authenticateToken);

todoItemsRouter.get("/", todoItemsController.getAll);
todoItemsRouter.get("/:id", todoItemsController.getOne);
todoItemsRouter.post("/", todoItemsController.create);
todoItemsRouter.patch("/:id", todoItemsController.update);
todoItemsRouter.delete("/:id", todoItemsController.delete);

export default todoItemsRouter;
