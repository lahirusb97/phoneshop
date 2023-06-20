import React from "react";

export default function Orders() {
  return (
    <div className="p-4">
      <div className=" border-4 border-black p-4">
        <h1 className="font-bold text-2xl text-blue-800">Manage Orders</h1>
        <div className="bg-gray-300 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Name:Lahiru</h3>
          <h3 className="text-lg font-semibold">Email:@gmail.com</h3>
          <h3 className="text-lg font-semibold">Mobile:0719180806</h3>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            suscipit voluptatum modi pariatur exercitationem vitae quos dolor
            magnam iure molestiae.
          </p>
          <button
            onClick={() => {}}
            className="p-2 my-2 bg-red-500 font-semibold text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
