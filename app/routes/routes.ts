import { Application } from "express";
import userRoutes from "../features/user/user-routes";
import noteRoutes from "../features/note/note-routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/notes", noteRoutes);
  }
}
