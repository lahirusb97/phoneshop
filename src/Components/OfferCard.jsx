import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import LazyLoad from "react-lazyload";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const OfferComponent = ({ itemData }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Calculate the remaining time until the end date
    const endDate = new Date(itemData.End_date.seconds * 1000);
    const now = new Date();
    const difference = endDate - now;

    // Update the countdown every second
    const interval = setInterval(() => {
      const remainingTime = endDate - new Date();
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // Format the countdown string
      const countdownString = `D:${days.toString().padStart(2, "0")} H:${hours
        .toString()
        .padStart(2, "0")} M:${minutes.toString().padStart(2, "0")} S:${seconds
        .toString()
        .padStart(2, "0")}`;

      setCountdown(countdownString);

      // Clear the interval when the countdown reaches zero
      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown("Expired");
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  const removeoffer = async () => {
    const db = getFirestore();
    const storage = getStorage();
    const desertRef = storageRef(storage, itemData["Img"]);
    const removeDoc = async () => {
      await deleteDoc(doc(db, "offers", itemData["Id"]));
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
    <div className="w-72 p-4 bg-gray-800 rounded-2xl shadow-lg">
      <div className="relative">
        <LazyLoad height={200}>
          <img
            className="object-contain bg-center w-72 h-40 rounded-t-xl"
            src={itemData.Img}
            alt="Product"
          />
        </LazyLoad>

        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
          {itemData["Precentage"]}% off
        </div>
      </div>
      <div className="text-center mt-1">
        <h2 className="font-semibold text-lg text-white">{itemData.Name}</h2>
        <h3 className="text-white ">
          RS{" "}
          {itemData["Price"] - (itemData.Price * itemData["Precentage"]) / 100}
        </h3>

        <button
          onClick={removeoffer}
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
        >
          Remove
        </button>
        <h3 className="font-semibold text-xl custom-outline bg-white text-black m-2">
          {countdown}
        </h3>
      </div>
    </div>
  );
};

export default OfferComponent;
