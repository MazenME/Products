
# Product Listing Web App

## Overview

This project is a simple product listing application that allows users to add, search, filter, and paginate through products
The app is built using **React**, **Recoil** for state management, and **Formik** with **Yup** for form handling and validation.
It uses **localStorage** to persist product data between sessions.

## Features

- **Add Product**: Users can upload an image, name, price, and description for a product.
- **Search Products**: Users can search for products by name.
- **Sort Products**: Users can sort products alphabetically (A-Z, Z-A), by date, or by price (low-high, high-low).
- **Pagination**: The product list is paginated, displaying a limited number of products per page.
- **Persist Data**: Product data is stored in the browser's localStorage to persist between page reloads.

## Setup Instructions

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your machine.

### Steps to Set Up the Project

1. **Clone the Repository**:
   bash
    git clone [https://github.com/MazenME/products.git](https://github.com/MazenME/products.git)

2. **Navigate into the project directory**:
  bash
    cd products

3. **Install dependencies**:
  bash
    npm install

4. **Run the development server**:
  bash
    npm start

5. Open `http://localhost:3000` in your browser to view the app.

### Build for Production

To build the project for production, run:

```bash
npm run build
```

This will create a `build/` folder with all the static assets to deploy.

## Recoil State Atoms and Selectors

- **Atoms**:
  - `productState`: Stores the list of products.
  - `modalState`: Controls the visibility of the modal.
  - `sortState`: Stores the current sort option.
  - `searchInputState`: Stores the current search input.

- **Selectors**:
  - `FilterProducts`: Filters and sorts the products based on the search input and sorting preferences.

## Additional Notes

- The form uses **Formik** for handling form state and **Yup** for validation.
- Images are converted to base64 and stored in localStorage.
- Pagination is implemented with **ReactPaginate**.

## Author

[Mazen Emad]
[mazenemad099@gmail.com]
