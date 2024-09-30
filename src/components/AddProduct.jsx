import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import Modal from "./Modal.jsx";
import { modalState, productState } from "../Recoil/Atoms.jsx";
import { convertToBase64 } from "../utils/file.js";

function AddProduct() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [, setProducts] = useRecoilState(productState);
  const closeModal = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const validation = Yup.object({
    image: Yup.mixed()
      .required("This field is Required")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    name: Yup.string()
      .required("This field is Required")
      .min(3, "Must be at least 3 characters")
      .max(15, "Must be at most 15 characters"),
    price: Yup.number()
      .min(1, "Must be at least 1")
      .required("This field is Required"),
    description: Yup.string()
      .required("This field is Required")
      .min(10, "Must be at least 10 characters")
      .max(300, "Must be at most 300 characters"),
  });

  const formik = useFormik({
    initialValues: {
      image: null,
      name: "",
      price: "",
      description: "",
    },
    validationSchema: validation,
    onSubmit: async function (values) {
      const base64Image = await convertToBase64(values.image);
      const newProduct = {
        ...values,
        image: base64Image,
      };

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct];
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        return updatedProducts;
      });

      formik.resetForm();
    },
  });
  return (
    <>
      <Modal
        className="relative"
        title="Add Product"
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <svg
          onClick={closeModal}
          className="absolute top-3 right-3 cursor-pointer"
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 11.6667L10 10M10 10L11.6667 8.33333M10 10L8.33333 8.33333M10 10L11.6667 11.6667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            stroke="#171717"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <label className="block w-full">
              <span className="text-gray-700 block mb-1">Image</span>
              <div className="rounded-md h-20 flex items-center justify-center border border-solid">
                <button
                  type="button"
                  className="p-2  rounded-md border border-solid border-[#D9F99D] cursor-pointer"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  Upload Image
                </button>
              </div>
            </label>
            <input
              id="imageInput"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue("image", file);
              }}
              className="hidden"
            />
            {formik.values.image && (
              <p className="mt-2 text-gray-500">
                Selected file: {formik.values.image.name}
              </p>
            )}
            {formik.errors.image && formik.touched.image && (
              <h4 className="text-red-700 mt-0">{formik.errors.image}</h4>
            )}

            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                value={formik.values.name}
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="mt-1 p-2 block w-full rounded-md border border-solid  focus:outline-none focus:ring-0"
              />
              {formik.errors.name && formik.touched.name && (
                <h4 className="text-red-700 mt-0">{formik.errors.name}</h4>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Price</span>
              <input
                value={formik.values.price}
                id="price"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                className="mt-1 p-2 block w-full rounded-md border border-solid focus:outline-none focus:ring-0"
              />
              {formik.errors.price && formik.touched.price && (
                <h4 className="text-red-700 mt-0">{formik.errors.price}</h4>
              )}
            </label>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                value={formik.values.description}
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full rounded-md border border-solid focus:outline-none focus:ring-0"
              ></textarea>
              {formik.errors.description && formik.touched.description && (
                <h4 className="text-red-700 mt-2">
                  {formik.errors.description}
                </h4>
              )}
            </label>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-solid shadow-sm text-sm font-medium rounded-md text-black bg-[#D9F99D] focus:outline-none"
            >
              Add Product
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddProduct;
