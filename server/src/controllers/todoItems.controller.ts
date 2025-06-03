import { Request, Response } from "express";
import TodoItemsService from "../services/todoItems.service";

class TodoItemsController {
  private service = new TodoItemsService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(`[todoItem] Create Error:`, err);
      res.status(400).json({ error: "Create failed" });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const result = await this.service.getAll();
      res.json(result);
    } catch (err) {
      console.error(`[todoItem] GetAll Error:`, err);
      res.status(500).json({ error: "Fetch failed" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.getOne(id);
      if (!result)
        res.status(404).json({ error: `todoItem not found` });
      else res.json(result);
    } catch (err) {
      console.error(`[todoItem] GetOne Error:`, err);
      res.status(400).json({ error: "Fetch failed" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.update(id, req.body);
      res.json(result);
    } catch (err) {
      console.error(`[todoItem] Update Error:`, err);
      res.status(400).json({ error: "Update failed" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.delete(id);
      res.json(result);
    } catch (err) {
      console.error(`[todoItem] Delete Error:`, err);
      res.status(400).json({ error: "Delete failed" });
    }
  };
}

export default TodoItemsController;
