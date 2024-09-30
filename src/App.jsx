import ProductList from "./components/ProductList.jsx";
import { useEffect } from "react";
import AddProduct from "./components/AddProduct.jsx";
import {  useRecoilState } from "recoil";
import SearchFilter from "./components/SearchFilter.jsx";
import { productState } from "./Recoil/Atoms.jsx";

const App = () => {


  const [products, setProducts] = useRecoilState(productState);
  useEffect(() => {
    const storeProducts = JSON.parse(localStorage.getItem("products"));
    if (storeProducts) setProducts(storeProducts);
  }, [setProducts]); 

  return (
    <>
        <SearchFilter />
        <ProductList products={products} />
        <AddProduct />
    </>
  );
};

export default App;
