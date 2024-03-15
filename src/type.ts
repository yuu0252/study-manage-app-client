export type TypeCategory = {
  _id: string;
  user: string;
  title: string;
};

export type TypeMemo = {
  _id: string;
  user: string;
  category: string;
  title: string;
  content: string;
};
