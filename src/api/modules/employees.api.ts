import type { AxiosResponse } from "axios";

import routes from "@/config/api/routes.api";
import { ErrorNamespaces, LoadingModules } from "@/config/api/types";

import createRequest from "../_base.api";

export const createEmployeeGetInfoRequest = (): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.employees("me"),
    },
    { needsAuth: true }
  );

export const createGetAllEmployeesRequest = (
  page: number,
  filters?: { [key: string]: any }
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.employees(`all/${page}`),
      params: filters,
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createDeleteEmployeeRequest = (
  employeeId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "DELETE",
      route: routes.employees(employeeId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createUpdateConfirmedStatusRequest = (
  employeeId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "PATCH",
      route: routes.employees(employeeId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createGetEmployeeByIdRequest = (
  employeeId: string
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "GET",
      route: routes.employees(employeeId),
    },
    { needsAuth: true, loadingModule: LoadingModules.TABLE_USERS }
  );

export const createEditEmployeeRequest = (
  employeeId: string,
  editData: { [key: string]: any }
): Promise<AxiosResponse | void> =>
  createRequest(
    {
      method: "PATCH",
      route: routes.employees(`edit/${employeeId}`),
      data: editData,
    },
    {
      needsAuth: true,
      loadingModule: LoadingModules.EDIT_DIALOG,
      errorsNamespace: ErrorNamespaces.EDIT_DIALOG,
    }
  );
