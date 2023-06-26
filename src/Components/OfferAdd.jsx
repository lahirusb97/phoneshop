import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export default function OfferAdd({ dialogOpen, open }) {
  //dialog open switch

  //image input
  const [inputimg, setInputImg] = useState(null);
  //product name
  const [productName, setProductName] = useState("");
  //product discription
  const [precentage, setPrecentage] = useState("");
  //product price
  const [price, setPrice] = useState("");
  // cant leave imuts empty error display
  const [inputError, setinputError] = useState(false);
  // only images can upload error display
  const [imgError, setImgError] = useState(false);
  //get user selected listed product Category

  const [offerEndTime, setOfferEndTime] = useState(null);
  useEffect(() => {
    if (!open) {
      setInputImg(null);
      setProductName("");
      setPrecentage("");
      setPrice("");
      setinputError(false);
      setImgError(false);
    }
  }, [open]);

  const handleClickOpen = () => {
    dialogOpen(true);
  };
  const handleClose = () => {
    dialogOpen(false);
  };

  const addOffer = async () => {
    if (
      productName.length > 0 &&
      precentage.length > 0 &&
      price.length > 0 &&
      inputimg &&
      offerEndTime
    ) {
      try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "offers"), {
          Name: productName,
          Precentage: parseInt(precentage),
          Price: parseInt(price),
          End_date: offerEndTime,
        });

        const storage = getStorage();
        const productStorageRef = storageRef(
          storage,
          `/offers/${docRef.id}/${inputimg.name}`
        );

        const snapshot = await uploadBytes(productStorageRef, inputimg);

        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, "offers", docRef.id), {
          Img: downloadURL,
          Id: docRef.id,
        });

        dialogOpen(false);
        setinputError(false);
      } catch (error) {
        console.error("Error adding offers:", error);
      }

      console.log("Offer added successfully!");
    } else {
      // Show an error message or perform any necessary error handling
      console.log(offerEndTime);
    }
  };
  return (
    <div>
      <Dialog
        disableBackdropClick={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Offer"}</DialogTitle>
        <DialogContent>
          <div className="m-2">
            <TextField
              onChange={(e) => setProductName(e.target.value)}
              className="w-full"
              id="outlined-basic"
              label="Product Name"
              type="text"
              variant="outlined"
            />

            <TextField
              style={{ margin: "1rem 0" }}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
              id="outlined-basic"
              label="Price"
              type="number"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setPrecentage(e.target.value)}
              className="w-full "
              id="outlined-basic"
              label="Offer Percentage (%)"
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: "%",
              }}
            />
            <span className="text-red-600 font-bold italic">
              Item Price With Offer :
              {price.length > 0 ? price - (price * precentage) / 100 : ""}
            </span>
            <span className="block">Add Image</span>
            <span className="text-red-600 font-bold italic">
              {imgError ? "Invalid File Format" : ""}
            </span>
            <TextField
              onChange={(e) => {
                const file = e.target.files[0];

                // Check if the selected file is an image
                if (file && file.type.startsWith("image/")) {
                  setInputImg(file);

                  setImgError(false);
                } else {
                  setInputImg(null);
                  setImgError(true);
                  console.log("Invalid file format. Please select an image.");
                }
              }}
              className="w-full"
              id="outlined-basic"
              type="file"
              accept="image/*"
              variant="outlined"
            />
            {inputError ? (
              <span className="text-red-600 font-bold italic">
                ** Fill All The Inputs **
              </span>
            ) : (
              <></>
            )}
            <div className="m-2">
              {/* Existing code... */}
              <DatePicker
                selected={offerEndTime}
                onChange={(date) => setOfferEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MM/dd/yyyy h:mm aa"
                placeholderText="Select Offer End Date & Time"
                className="w-full border-2 border-black p-2"
              />
              {/* Existing code... */}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addOffer}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
