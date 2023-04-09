import { Record } from "pocketbase";

export interface IUser extends Record {
  username: string;
  email?: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar?: string;
  emails_account: boolean;
  emails_updates: boolean;
  isAdmin: boolean;
}

export interface IPocketBaseAuth {
  model?: IUser;
  token?: string;
}

export interface IApp extends Record {
  name: string;
  app_id: string;
  icon: string;
  platforms: Array<"windows" | "macos" | "linux" | "ios" | "android" | "tvos" | "android-tv">;
}

export interface IApp extends Record {
  app: string;
  version: string;
  description?: string;
  date?: string;
  windows_amd64?: string;
  windows_arm64?: string;
  macos_amd64?: string;
  macos_arm64?: string;
  linux_amd64?: string;
  linux_arm64?: string;
  ios?: string;
  android?: string;
  tvos?: string;
  android_tv?: string;
}

export type IColorScheme = "light" | "dark";
