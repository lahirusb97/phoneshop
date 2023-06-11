import React from "react";

export default function ItemCard({ item }) {
  console.log(item);
  return (
    <div className="w-72 shadow-2xl m-4">
      <img className="object-contain border-4" src={item["Img"]} />

      <h1 className="text-center font-semibold text-lg">{item["Name"]}</h1>
      <h2 className="text-center font-bold text-red-600">
        {"RS: " + item["Price"]}
      </h2>
      <p className="text-center">{item["Discription"]}</p>
      <div className="flex justify-between">
        <button className="p-4 grow bg-green-600 font-semibold text-white">
          Edit
        </button>
        <button className="p-4 grow bg-red-600 font-semibold text-white">
          Remove
        </button>
      </div>
    </div>
  );
}
