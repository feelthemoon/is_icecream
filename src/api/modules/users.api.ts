import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import { ErrorNamespaces, LoadingModules } from "@/config/api/types";

import createRequest from "../_base.api";

export const createUserGetInfoRequest = (): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.users("me"),
    },
    { needsAuth: true }
  );

export const createGetAllUsersRequest = (
  page: number,
  filters?: { [key: string]: any }
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.users(`all/${page}`),
      params: filters,
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createDeleteUserRequest = (
  userId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "DELETE",
      route: routes.users(userId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createUpdateConfirmedStatusRequest = (
  userId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "PATCH",
      route: routes.users(userId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createGetUserByIdRequest = (
  userId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.users(userId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createEditUserRequest = (
  userId: string,
  editData: { [key: string]: any }
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "PATCH",
      route: routes.users(`edit/${userId}`),
      data: editData,
    },
    {
      needsAuth: true,
      loadingModule: LoadingModules.EDIT_DIALOG,
      errorsNamespace: ErrorNamespaces.EDIT_DIALOG,
    }
  );
