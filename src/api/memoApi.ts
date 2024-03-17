import { axiosFetchServer } from "./axiosFetchServer";

export const memoApi = {
  create: (categoryId: string, params: object) =>
    axiosFetchServer.post(`/categories/${categoryId}/memos`, params),
  getAll: (categoryId: string) =>
    axiosFetchServer.get(`/categories/${categoryId}/memos`),
  getOne: (categoryId: string, memoId: string) =>
    axiosFetchServer.get(`/categories/${categoryId}/memos/${memoId}`),
  delete: (categoryId: string, memoId: string) =>
    axiosFetchServer.delete(`/categories/${categoryId}/memos/${memoId}`),
};
