import { UserRoles } from "./UserRoles.type";
import { WorkingStatus } from "./WorkingStatus.type";

export interface User {
  id: string;
  email: string;
  first_name: string;
  second_name?: string;
  middle_name?: string;
  avatar: string;
  confirmed: boolean;
  refresh_hash: string;
  role: UserRoles;
  salary: number;
  status: WorkingStatus;
  created_at: Date;
}
