import { User } from "./User.type";

export interface Stall {
  id: string;
  name: string;
  address: string;
  thumb?: string;
  created_at: Date;
  updated_at: Date;
  employees: User[];
}
