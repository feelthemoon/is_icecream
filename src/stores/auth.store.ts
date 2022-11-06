import { AxiosError, AxiosResponse } from "axios";
import { defineStore } from "pinia";

import {
  createSigninRequest,
  createSignupRequest,
  createRefreshAccessTokenRequest,
  createLogoutRequest,
} from "@/api";
import type { SigninData, SignupData } from "@/config/api/types";
import router from "@/router";
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
  const logout = async () => {
    const rootStore = useRootStore();

    try {
      await createLogoutRequest();

      rootStore.$reset();
      localStorage.clear();

      await router.push({ name: "SigninPage" });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        rootStore.$reset();
        localStorage.clear();

        await router.push({ name: "SigninPage" });
      }
    }
  };
  return { signin, signup, refreshAccessToken, logout };
});
