
import { ENUM_STATUS_CODES_SUCCESS } from "../../../libs/status-codes-enums";
import { Result } from "../../../libs/Result";
import { NoteData } from "./note-model";
import noteRepository from "./note-repository";
import { UserData } from "../user/user-model";
import userService from "../user/user-service";

interface INoteService {
  getNotesByUserId(userId: number): Promise<Result<NoteData[]>>;
}

/** This is where the business logic of the software occurs.
 * Service methods may call other service methods from itself or other domain service methods.
 * External API calls are also done here.
 */
class NoteService implements INoteService {
  public async getNotesByUserId(userId: number): Promise<Result<NoteData[]>> {
    const userResult: Result<UserData> = await userService.getUserById(userId); // Different domain service method called for valid check on userId exist or not.

    if (userResult.isFailure()) {
      return userResult; // Same status code, same message.
    }

    const notes: NoteData[] = await noteRepository.getNotesByUserId(userId);


    return Result.succeed(ENUM_STATUS_CODES_SUCCESS.OK, notes, "Notes successfully retrieved.");
  }
}

export default new NoteService();
