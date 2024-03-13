import { axiosFetchServer } from "./axiosFetchServer";

export const categoryApi = {
  getAll: () => axiosFetchServer.get("/categories"),
};
