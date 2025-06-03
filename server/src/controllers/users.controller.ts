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
  TsoaResponse,
  Res,
  Security,
} from "tsoa";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  private service = new UsersService();

  @Post("/")
  @Security("BearerAuth")
  @SuccessResponse("201", "Created")
  public async create(
    @Body() body: any,
    @Res() createdResponse: TsoaResponse<201, any>,
    @Res() badRequestResponse: TsoaResponse<400, { error: string }>
  ): Promise<any> {
    try {
      const result = await this.service.create(body);
      return createdResponse(201, result);
    } catch (err) {
      console.error(`[user] Create Error:`, err);
      return badRequestResponse(400, { error: "Create failed" });
    }
  }

  @Get("/")
  @Security("BearerAuth")
  @SuccessResponse("200", "OK")
  public async getAll(
    @Res() okResponse: TsoaResponse<200, any>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<any> {
    try {
      const result = await this.service.getAll();
      return okResponse(200, result);
    } catch (err) {
      console.error(`[user] GetAll Error:`, err);
      return errorResponse(500, { error: "Fetch failed" });
    }
  }

  @Get("{id}")
  @Security("BearerAuth")
  @SuccessResponse("200", "OK")
  public async getOne(
    @Path() id: number,
    @Res() okResponse: TsoaResponse<200, any>,
    @Res() notFoundResponse: TsoaResponse<404, { error: string }>,
    @Res() badRequestResponse: TsoaResponse<400, { error: string }>
  ): Promise<any> {
    try {
      const result = await this.service.getOne(id);
      if (!result) return notFoundResponse(404, { error: `user not found` });
      return okResponse(200, result);
    } catch (err) {
      console.error(`[user] GetOne Error:`, err);
      return badRequestResponse(400, { error: "Fetch failed" });
    }
  }

  @Patch("{id}")
  @Security("BearerAuth")
  @SuccessResponse("200", "OK")
  public async update(
    @Path() id: number,
    @Body() body: any,
    @Res() okResponse: TsoaResponse<200, any>,
    @Res() badRequestResponse: TsoaResponse<400, { error: string }>
  ): Promise<any> {
    try {
      const result = await this.service.update(id, body);
      return okResponse(200, result);
    } catch (err) {
      console.error(`[user] Update Error:`, err);
      return badRequestResponse(400, { error: "Update failed" });
    }
  }

  @Delete("{id}")
  @Security("BearerAuth")
  @SuccessResponse("200", "OK")
  public async delete(
    @Path() id: number,
    @Res() okResponse: TsoaResponse<200, any>,
    @Res() badRequestResponse: TsoaResponse<400, { error: string }>
  ): Promise<any> {
    try {
      const result = await this.service.delete(id);
      return okResponse(200, result);
    } catch (err) {
      console.error(`[user] Delete Error:`, err);
      return badRequestResponse(400, { error: "Delete failed" });
    }
  }

  @Post("/login")
  @SuccessResponse("200", "OK")
  public async login(
    @Body() body: any,
    @Res() okResponse: TsoaResponse<200, { token: string }>,
    @Res() unauthorizedResponse: TsoaResponse<401, { error: string }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<any> {
    try {
      const { email, password } = body;
      const user = await this.service.authenticate(email, password);
      if (!user) {
        return unauthorizedResponse(401, { error: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "1h" }
        );
        return okResponse(200, { token });
      }
    } catch (err) {
      console.error(`[user] Login Error:`, err);
      return errorResponse(500, { error: "Login failed" });
    }
  }

  @Post("/signup")
  @SuccessResponse("201", "Created")
  public async signup(
    @Body() body: any,
    @Res() createdResponse: TsoaResponse<201, { id: number; email: string }>,
    @Res() badRequestResponse: TsoaResponse<400, { error: string }>,
    @Res() conflictResponse: TsoaResponse<409, { error: string }>,
    @Res() errorResponse: TsoaResponse<500, { error: string }>
  ): Promise<any> {
    try {
      const { email, password, ...rest } = body;
      if (!email || !password) {
        return badRequestResponse(400, {
          error: "Email and password are required",
        });
      } else {
        // Check if user already exists
        const existingUser = await this.service.getByEmail(email);
        if (existingUser) {
          return conflictResponse(409, { error: "User already exists" });
        } else {
          const user = await this.service.create({ email, password, ...rest });
          return createdResponse(201, { id: user.id, email: user.email });
        }
      }
    } catch (err) {
      console.error(`[user] Signup Error:`, err);
      return errorResponse(500, { error: "Signup failed" });
    }
  }
}
