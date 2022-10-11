import type { AxiosResponse } from "axios";
import { defineStore } from "pinia";

import {
  createSigninRequest,
  createSignupRequest,
  createRefreshAccessTokenRequest,
} from "@/api";
import type { SigninData, SignupData } from "@/config/api/types";
import { useRootStore } from "@/stores";

export const useAuth = defineStore("auth", () => {
  const signin = async (data: SigninData) => {
    await createSigninRequest(data);
  };
  const signup = async (data: SignupData) => {
    await createSignupRequest(data);
  };
  const refreshAccessToken = async () => {
    const rootStore = useRootStore();

    const response: AxiosResponse | void =
      await createRefreshAccessTokenRequest();

    if (response) {
      rootStore.$patch({
        token: `${response.data.type} ${response.data.token}`,
      });
    } else {
      throw Error();
    }
  };

  return { signin, signup, refreshAccessToken };
});
