import { Router } from "express";
import { asyncHandler } from "../../utils/utils";
import NoteController from "./note-controller";
import { checkAuthTokenHeader } from "../../middlewares/auth";
import { userParamValidator } from "../user/user-validator"

/** Route for the domain API. */
class NoteRoute {
  router = Router();
  controller = new NoteController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Using validator from a different domain for reusability.
    this.router.get("/:userId", checkAuthTokenHeader, userParamValidator, asyncHandler(this.controller.getNotesByUserId));
  }
}

export default new NoteRoute().router;
