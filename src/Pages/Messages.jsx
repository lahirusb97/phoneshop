import React from "react";
import { useEffect, useState } from "react";
import {
  getFirestore,
  onSnapshot,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Messages() {
  const [orderMsg, setorderMsg] = useState([]);

  useEffect(() => {
    const offerList = () => {
      const db = getFirestore();
      const collectionRef = collection(db, "Messages");

      onSnapshot(collectionRef, (snapshot) => {
        const items = [];

        snapshot.forEach((doc) => {
          //   items.push(doc.data());
          items.push({ id: doc.id, ...doc.data() });
        });
        setorderMsg(items);
      });
    };
    offerList();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl text-blue-800 text-center my-4">
        Messages
      </h1>
      {orderMsg.map((e, i) => (
        <div key={"s" + i} className="shadow-lg w-96 p-4">
          <div className="max-w-screen-md">
            <h3 className="font-black">Name:{e["Name"]}</h3>
            <h3 className="font-black">Email:{e["Email"]}</h3>
            <h3 className="font-normal text-center">
              Message:
              <br />
              {e["Message"]}
              <br />
            </h3>
          </div>
          <button
            onClick={async () => {
              const db = getFirestore();
              await deleteDoc(doc(db, "Messages", e["id"])); // Use "Messages" as the collection name
            }}
            className="p-2 m-auto bg-red-500 font-semibold text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
