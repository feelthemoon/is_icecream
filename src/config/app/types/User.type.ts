export interface User {
  id: string;
  email: string;
  first_name: string;
  second_name?: string;
  middle_name?: string;
  avatar: string;
  confirmed: boolean;
  refresh_hash: string;
  role: string;
  created_at: Date;
}
