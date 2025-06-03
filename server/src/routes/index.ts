import { Router } from "express";
import categoriesRouter from "./categories.routes";
import usersRouter from "./users.routes";
import todoItemsRouter from "./todoItems.routes";

const mainRouter = Router();

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/todo-items", todoItemsRouter);

export default mainRouter;
