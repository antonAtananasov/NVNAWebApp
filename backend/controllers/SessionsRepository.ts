import { IUserSession } from "./dtos";

export class SessionsRepository {
   public sessions: IUserSession[] = [];
}
const sessionsRepository = new SessionsRepository()
export default sessionsRepository