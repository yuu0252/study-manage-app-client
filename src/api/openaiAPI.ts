import { axiosFetchServer } from "./axiosFetchServer";

export const openaiApi = {
  chat: (params: object) => axiosFetchServer.post("openai/chat", params),
};
