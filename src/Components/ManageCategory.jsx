import React, { useState } from "react";
import { TextField } from "@mui/material";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  query,
  collection,
  where,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import del from "../assets/delete.svg";
import "react-toastify/dist/ReactToastify.css";
export default function ManageCategory({ catList }) {
  const [categoryName, setCategoryName] = useState("");
  const removeCategory = async (item) => {
    const db = getFirestore();

    const categoryRef = query(
      collection(db, "Product"),
      where("Category", "==", item)
    );
    const snapshot = await getDocs(categoryRef);
    const count = snapshot.size;

    if (count > 0) {
      console.log("Value exists ");
      toast.warn("Remove product before deleteing category", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const documentRef = doc(db, "Category", "FMjKPsKH4uZQqnwqbPHf");

      // Remove the item from the array using arrayRemove()
      await updateDoc(documentRef, {
        Category_list: arrayRemove(item),
      });
    }
  };
  const addCategory = async () => {
    const userInput = categoryName.toLowerCase();
    if (catList.includes(userInput)) {
      toast.error("Category you entered is alreay exist", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const db = getFirestore();
      const docRef = doc(db, "Category", "FMjKPsKH4uZQqnwqbPHf");

      // Update the array field using arrayUnion
      await updateDoc(docRef, {
        Category_list: arrayUnion(userInput),
      });
    }
  };

  return (
    <div>
      <div className="border-2 border-black m-2 p-2">
        <h1 className="font-bold text-2xl text-blue-800">Manage Category</h1>
        <h3 className="font-semibold text-lg text-gray-800">Add Category</h3>
        <div className="flex my-2">
          <TextField
            label="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            variant="outlined"
          />
          <button
            onClick={addCategory}
            className="p-4 bg-green-600 ml-2 text-white"
          >
            Add
          </button>
        </div>
        <h3 className="font-semibold text-lg text-gray-800">Category List</h3>
        <ul className="">
          {catList.map((e, i) => (
            <li key={"cl" + i} className="flex items-center my-2">
              <button
                onClick={() => removeCategory(e)}
                className=" bg-red-500 text-white mr-2"
              >
                <img src={del} />
              </button>
              <h6 className="font-semibold capitalize">{e}</h6>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
