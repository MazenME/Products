import { selector } from "recoil";
import { sortState, productState, searchInputState } from "./Atoms.jsx";

export const FilterProducts = selector({
  key: "FilterProducts",
  get: ({ get }) => {
   const searchInput = get(searchInputState).trim().toLowerCase();;
    const allProducts = get(productState);
    const sortCase = get(sortState);

     const filteredProducts = allProducts.filter((product) =>
       product.name.toLowerCase().includes(searchInput)
     );

    return filteredProducts.sort((a, b) => {
      switch (sortCase) {
        case "A-Z":
          return a.name.localeCompare(b.name);
        case "Z-A":
          return b.name.localeCompare(a.name);
        case "Low-to-High":
          return a.price - b.price;
        case "High-to-Low":
          return b.price - a.price;
        case "Date":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });
  }
});