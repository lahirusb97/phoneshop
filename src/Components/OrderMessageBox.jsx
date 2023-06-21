import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, deleteDoc } from "firebase/firestore";

export default function OrderMessageBox({ data }) {
  const [item, setIem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      if (data["Offer_Item"]) {
        const docRef = doc(db, "offers", data["Product_Id"]);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIem(docSnap.data());
        } else {
          setIem([]);
        }
      } else {
        const docRef = doc(db, "Product", data["Product_Id"]);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIem(docSnap.data());
        } else {
          setIem([]);
        }
      }
    };

    fetchData();
  }, []);
  const removeItem = async () => {
    const db = getFirestore();

    await deleteDoc(doc(db, "Orders", data["Id"]));
  };
  return (
    <div className=" border-4 border-black p-4 w-96 m-4">
      <div className="text-center">
        <img className="object-contain w-56 h-56 m-auto" src={item["Img"]} />
        <h1 className="font-semibold text-lg">{item["Name"]}</h1>
        <h1 className="font-semibold text-lg">Rs: {item["Price"]}.00</h1>
      </div>
      <div className="bg-gray-300 p-4 rounded-lg">
        <h3 className="text-lg font-bold">Name: {data["Name"]}</h3>
        <h3 className="text-lg font-semibold">Mobile:{data["Mobile"]}</h3>
        <h3 className="text-lg font-semibold">Adddress:{data["Address"]}</h3>

        <p>{data["Message"]}</p>
        <button
          onClick={removeItem}
          className="p-2 my-2 bg-red-500 font-semibold text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
