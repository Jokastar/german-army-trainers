"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { deleteProduct } from '../_actions/_product';

function ProductsTable({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        
        const response = await deleteProduct(productId);
        if (response.success) {
          // Remove the deleted product from the products list in state
          setProducts(products.filter((product) => product.id !== productId));
          alert("Product deleted successfully");
        } else {
          console.error(response.error);
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.log("Error deleting product: " + error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  return (
    <div className="w-full h-full p-4">
      <Link href={"/admin/products/newproduct"}>
        <button className="btn btn-primary mb-4">Add New Product</button>
      </Link>

      <div className="overflow-x-auto">
        <table className="table w-full h-full">
          <thead>
            <tr className="text-white">
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  {product.stock > 0 ? (
                    <span className="badge badge-success">Available</span>
                  ) : (
                    <span className="badge badge-error">Out of Stock</span>
                  )}
                </td>
                <td>
                  {/* Dropdown Menu */}
                  <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm m-1">
                      Actions
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link href={"/admin/products/editproduct/" + product.id}>
                          Edit Product
                        </Link>
                      </li>
                      <li>
                        <a
                          className="text-red-500"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete Product
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable;

