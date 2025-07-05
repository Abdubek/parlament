import { api } from './api';
import type { AxiosRequestConfig, AxiosResponse } from "axios";
  
function getApiMutator(prefix: string) {
  return function <T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const modifiedConfig = {
      ...config,
      url: prefix + config.url,
    };

    return api
      .request<T>(modifiedConfig)
      .then((response: AxiosResponse<T>) => response.data);
  };
}

export function authApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("auth")(config);
}

export function calendarApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("calendar")(config);
}

export function chatApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("chat")(config);
}

export function classifierApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("classifier")(config);
}

export function deputyRequestApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("deputy-request")(config);
}

export function fileTemplateApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("file-template")(config);
}

export function filesApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("files")(config);
}

export function instancesApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("instances")(config);
}

export function knowledgeApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("knowledge")(config);
}

export function notificationApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("notification")(config);
}

export function onlyofficeClientApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("onlyoffice-client")(config);
}

export function ruleMakingApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("rule-making")(config);
}

export function taskApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("task")(config);
}

export function userApiMutator<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  return getApiMutator("user")(config);
}
  