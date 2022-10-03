import { defineStore } from "pinia";

import { createSigninRequest, createSignupRequest } from "@/api";
import type { SigninData, SignupData } from "@/api/config/types";

export const useAuth = defineStore("auth", () => {
  const signin = async (data: SigninData) => {
    await createSigninRequest(data);
  };
  const signup = async (data: SignupData) => {
    await createSignupRequest(data);
  };
  return { signin, signup };
});
