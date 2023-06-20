import React from "react";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import OfferCard from "../Components/offerCard";
import OfferAdd from "../Components/OfferAdd";
export default function Offers() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const openAddItem = (data) => {
    setOpen(data);
  };
  useEffect(() => {
    const offerList = () => {
      const db = getFirestore();
      const collectionRef = collection(db, "offers");

      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          console.log(doc.data());
          items.push(doc.data());
        });
        setItems(items);
      });
    };
    offerList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-blue-800">Manage Offers</h1>
      <button onClick={openAddItem} className="p-2 font-bold m-4 bg-green-500">
        Add New Offer
      </button>
      <OfferAdd open={open} dialogOpen={openAddItem} />
      <h2 className="font-semibold text-xl text-gray-800">Offers List</h2>
      <div className="flex flex-wrap justify-center">
        {items.map((e, i) => (
          <div className="m-4" key={"s" + i}>
            <OfferCard itemData={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
