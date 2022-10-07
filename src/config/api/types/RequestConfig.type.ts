import { AxiosRequestHeaders, Method } from "axios";

export interface RequestConfig {
  route: string;
  method: Method;
  headers?: AxiosRequestHeaders;
  params?: unknown;
  data?: unknown;
  loadingModule?: string;
  errorsNamespace?: string;
}
