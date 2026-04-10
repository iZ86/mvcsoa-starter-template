import { Request, Response } from "express";
import { Result } from "../../../libs/Result";
import { NoteData } from "./note-model";
import noteService from "./note-service";

/** Used to handle HTTP requests,
 * Organize data to be sent to service.
 * Controls which service method to use.
 */
export default class NoteController {

  async getNotesByUserId(req: Request, res: Response) {
    const userId: number = Number(req.params.userId);

    const result: Result<NoteData[]> = await noteService.getNotesByUserId(userId);

    if (result.isSuccess()) {
      return res.sendResponse(result.getStatusCode(), result.getMessage(), result.getData());
    } else if (result.isFailure()) {
      return res.sendResponse(result.getStatusCode(), result.getMessage());
    }
  }
}
