import { axiosFetchServer } from "./axiosFetchServer";

export const authApi = {
  login: (username: string, password: string) =>
    axiosFetchServer.post("/auth/login", {
      username: username,
      password: password,
    }),
};
