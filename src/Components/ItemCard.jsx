import React from "react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { TextField, TextareaAutosize } from "@mui/material";

export default function ItemCard({ item }) {
  const handleRemove = async () => {
    const db = getFirestore();
    const storage = getStorage();
    const desertRef = ref(storage, item["Img"]);
    const removeDoc = async () => {
      await deleteDoc(doc(db, "Product", item["Id"]));
    };
    // Delete the Img file
    deleteObject(desertRef)
      .then(() => {
        removeDoc();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
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
        <button
          onClick={handleRemove}
          className="p-4 grow bg-red-600 font-semibold text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
