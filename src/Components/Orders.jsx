import React, { useEffect, useState } from "react";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import OrderMessageBox from "../Components/OrderMessageBox";
export default function Orders() {
  const [orderMsg, setorderMsg] = useState([]);

  useEffect(() => {
    const offerList = () => {
      const db = getFirestore();
      const collectionRef = collection(db, "Orders");

      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setorderMsg(items);
      });
    };
    offerList();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl text-blue-800 p-4 text-center">
        Manage Orders
      </h1>
      <div className=" flex flex-wrap">
        {orderMsg.map((e) => (
          <div>
            <OrderMessageBox data={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
