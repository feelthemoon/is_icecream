export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData extends SigninData {
  first_name: string;
}
