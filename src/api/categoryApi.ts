import { axiosFetchServer } from "./axiosFetchServer";

export const categoryApi = {
  create: (params: { title: string }) =>
    axiosFetchServer.post("/categories", params),
  getAll: () => axiosFetchServer.get("/categories"),
  delete: (categoryId: string) =>
    axiosFetchServer.delete(`/categories/${categoryId}`),
};
