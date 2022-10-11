import { AxiosRequestHeaders, Method } from "axios";

import { LoadingModules, ErrorNamespaces } from "./ApiModules.type";

export interface RequestConfig {
  route: string;
  method: Method;
  headers?: AxiosRequestHeaders;
  params?: unknown;
  data?: unknown;
  loadingModule?: string;
  errorsNamespace?: string;
}

export interface RequestOptions {
  loadingModule?: LoadingModules;
  errorsNamespace?: ErrorNamespaces;
  bubbleErrors?: boolean;
}
