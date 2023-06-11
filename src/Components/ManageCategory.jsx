import React from "react";
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
} from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ManageCategory({ catList }) {
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
  return (
    <div>
      <div className="border-2 border-black m-2 p-2">
        <h1 className="font-bold text-2xl text-blue-800">Manage Category</h1>
        <h3 className="font-semibold text-lg text-gray-800">Add Category</h3>
        <div className="flex my-2">
          <TextField label="Category Name" variant="outlined" />
          <button className="p-4 bg-green-600 ml-2 text-white">Add</button>
        </div>
        <h3 className="font-semibold text-lg text-gray-800">Category List</h3>
        <ul className="">
          {catList.map((e, i) => (
            <li key={"cl" + i} className="flex items-center my-2">
              <button
                onClick={() => removeCategory(e)}
                className="p-2 bg-red-500 text-white mr-2"
              >
                Remove
              </button>
              <h6 className="font-semibold ">{e}</h6>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="bottom-center"
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
