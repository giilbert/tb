import { invoke } from "@tauri-apps/api";

export const setKeychainValue = async (key: string, value: string) => {
  await invoke("set_keychain_value", { key, value });
};

export const getKeychainValue = async (key: string) => {
  return (await invoke("get_keychain_value", { key })) as string;
};
