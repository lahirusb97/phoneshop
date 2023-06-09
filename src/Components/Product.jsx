import React from "react";
import { TextField } from "@mui/material";
export default function Product() {
  return (
    <div>
      <div className="border-2 border-black m-2 p-2">
        <h1 className="font-bold text-2xl text-blue-800">Manage Product</h1>
        <button className="p-4 bg-green-600 text-white font-semibold text-lg my-2">
          Add Product
        </button>
      </div>
    </div>
  );
}
