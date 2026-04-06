import { Application } from "express";
import userRoutes from "../features/user/user-routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/users", userRoutes)
  }
}
