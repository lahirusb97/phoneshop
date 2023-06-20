import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Orders from "./Orders";
import ProductManage from "./ProductManage";
import { Link } from "react-router-dom";
import Offers from "./Offers";
export default function Home() {
  const [curentRoute, setCurrentRoute] = useState("order");
  return (
    <div>
      <nav className="bg-gray-900 text-white flex items-center">
        <div className="bg-white p-2 m-2 rounded-full">
          <img src="./adminlogo.svg" />
        </div>
        <ul className="flex ml-24">
          <li
            onClick={() => setCurrentRoute("order")}
            className={"text-lg font-semibold mr-6 relative"}
          >
            <Link to="/order">Orders</Link>
            {curentRoute === "order" ? (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-white mt-2"></span>
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => setCurrentRoute("product")}
            className={"text-lg font-semibold mr-6 relative"}
          >
            <Link to="/product">Product Manage</Link>
            {curentRoute === "product" ? (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-white mt-2"></span>
            ) : (
              <></>
            )}
          </li>
          <li
            onClick={() => setCurrentRoute("offers")}
            className={"text-lg font-semibold mr-6 relative"}
          >
            <Link to="/offers">Special Offer</Link>
            {curentRoute === "offers" ? (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-white mt-2"></span>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/product" element={<ProductManage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </div>
  );
}
