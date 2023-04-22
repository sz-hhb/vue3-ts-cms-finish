import hyRequest from "../index";
import { IDataType } from "../types";
import { IAccount, ILoginResult } from "./type";

enum LoginAPI {
  AccountLogin = "/login",
  UserInfo = "/users/",
  MenuRole = "/role/",
}

export function accountLogin(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function getUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showLoading: false,
  });
}

export function getMenuByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.MenuRole + id + "/menu",
    showLoading: false,
  });
}
