import { axiosFetchServer } from "./axiosFetchServer";

export const memoApi = {
  create: (categoryId: string, params: object) =>
    axiosFetchServer.post(`/categories/${categoryId}/memos`, params),
  getAll: (categoryId: string) =>
    axiosFetchServer.get(`/categories/${categoryId}/memos`),
};
