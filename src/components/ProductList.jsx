import { useRecoilValue } from "recoil";
import Pagination from "./Pagination.jsx";
import { useEffect, useState } from "react";
import img from "../../src/images/currency-pound-1.png";
import { FilterProducts } from "../Recoil/Selector.jsx";

function ProductList() {
  const filteredProducts = useRecoilValue(FilterProducts);
  const [currentPage, setCurrentPage] = useState(0);
  
  const productsPerPage = 2; 
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const displayedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );


  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredProducts]);

  return (
    <div className="container">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] p-0 rounded-md">
        {displayedProducts.map((product, index) => (
          <div className="w-fit mx-auto" key={index}>
            <img
              src={product.image}
              alt={product.name}
              className="w-[326px] h-[326px] object-cover rounded-md"
            />
            <div className="data flex justify-between items-center">
              <div>
                <p className="text-[13px] font-medium mt-2">{product.name}</p>
                <p className="text-gray-500 mt-1">{product.description}</p>
                <p className="text-gray-900 mt-1 flex">
                  <img src={img} alt="" />
                  {product.price}
                </p>
              </div>
              <div className="fav p-2 border border-solid border-[#E5E5E5] rounded-md cursor-pointer">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.59835 5.26501C2.13388 6.72947 2.13388 9.10384 3.59835 10.5683L10 16.97L16.4017 10.5683C17.8661 9.10384 17.8661 6.72947 16.4016 5.26501C14.9372 3.80054 12.5628 3.80054 11.0983 5.26501L10 6.3634L8.90165 5.26501C7.43718 3.80054 5.06282 3.80054 3.59835 5.26501Z"
                    stroke="#171717"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </div>
  );
}

export default ProductList;
