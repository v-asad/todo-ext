import { Response } from "express";
import UsersService from "../services/users.service";
import jwt from "jsonwebtoken";

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Patch,
  Delete,
  Tags,
  Res,
} from "tsoa";

@Route("users")
@Tags("Users")
class UsersController extends Controller {
  private service = new UsersService();

  @Post("/")
  @SuccessResponse("201", "Created")
  public async create(@Body() body: any, @Res() res?: Response): Promise<any> {
    try {
      const result = await this.service.create(body);
      if (res) {
        res.status(201).json(result);
      }
    } catch (err) {
      console.error(`[user] Create Error:`, err);
      if (res) {
        res.status(400).json({ error: "Create failed" });
      }
    }
  }

  @Get("/")
  @SuccessResponse("200", "OK")
  public async getAll(@Res() res: Response): Promise<any> {
    try {
      const result = await this.service.getAll();
      res.json(result);
    } catch (err) {
      console.error(`[user] GetAll Error:`, err);
      if (res) {
        res.status(500).json({ error: "Fetch failed" });
      }
    }
  }

  @Get("{id}")
  @SuccessResponse("200", "OK")
  public async getOne(@Path() id: number, @Res() res: Response): Promise<any> {
    try {
      const result = await this.service.getOne(id);
      if (!result) res.status(404).json({ error: `user not found` });
      else res.json(result);
    } catch (err) {
      console.error(`[user] GetOne Error:`, err);
      res.status(400).json({ error: "Fetch failed" });
    }
  }

  @Patch("{id}")
  @SuccessResponse("200", "OK")
  public async update(
    @Path() id: number,
    @Body() body: any,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.service.update(id, body);
      res.json(result);
    } catch (err) {
      console.error(`[user] Update Error:`, err);
      res.status(400).json({ error: "Update failed" });
    }
  }

  @Delete("{id}")
  @SuccessResponse("200", "OK")
  public async delete(@Path() id: number, @Res() res: Response): Promise<any> {
    try {
      const result = await this.service.delete(id);
      res.json(result);
    } catch (err) {
      console.error(`[user] Delete Error:`, err);
      res.status(400).json({ error: "Delete failed" });
    }
  }

  @Post("/login")
  @SuccessResponse("200", "OK")
  public async login(@Body() body: any, @Res() res: Response): Promise<any> {
    try {
      const { email, password } = body;
      const user = await this.service.authenticate(email, password);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "1h" }
        );
        res.json({ token });
      }
    } catch (err) {
      console.error(`[user] Login Error:`, err);
      if (res) {
        res.status(500).json({ error: "Login failed" });
      }
    }
  }

  @Post("/signup")
  @SuccessResponse("201", "Created")
  public async signup(@Body() body: any, @Res() res: Response): Promise<any> {
    try {
      const { email, password, ...rest } = body;
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
      } else {
        // Check if user already exists
        const existingUser = await this.service.getByEmail(email);
        if (existingUser) {
          res.status(409).json({ error: "User already exists" });
        } else {
          const user = await this.service.create({ email, password, ...rest });
          res.status(201).json({ id: user.id, email: user.email });
        }
      }
    } catch (err) {
      console.error(`[user] Signup Error:`, err);
      res.status(500).json({ error: "Signup failed" });
    }
  }
}

export default UsersController;
