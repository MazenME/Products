import { atom } from "recoil";

export const productState = atom({
  key: "productState",
  default: [],
});

export const modalState = atom({
  key: "isOpen",
  default: false,
});

export const sortState = atom({
  key: "sort",
  default: "",
});

export const searchInputState = atom({
  key: "searchInputState",
  default: "",
});

