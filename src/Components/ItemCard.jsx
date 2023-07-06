import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TextField,
  InputLabel,
  Select,
  Box,
  MenuItem,
  FormControl,
} from "@mui/material";

export default function ItemCard({ catList, item, val }) {
  //HANDLE EDIT POP UP
  //dialog open switch
  const [open, setOpen] = useState(false);
  //image input
  const [inputimg, setInputImg] = useState(null);
  //product name
  const [productName, setProductName] = useState("");
  //product discription
  const [discription, setDiscription] = useState("");
  //product price
  const [price, setPrice] = useState("");
  // cant leave imuts empty error display
  const [inputError, setinputError] = useState(false);
  // only images can upload error display
  const [imgError, setImgError] = useState(false);
  //get user selected listed product Category
  const [selectedCat, setSelectedCat] = useState("");
  const handleChange = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //HANDLE EDIT POP UP
  const handleRemove = async () => {
    const db = getFirestore();
    const storage = getStorage();
    const desertRef = storageRef(storage, item["Img"]);
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
  const editProduct = async () => {
    if (
      productName.length > 0 &&
      discription.length > 0 &&
      price.length > 0 &&
      selectedCat.length > 0
    ) {
      try {
        const db = getFirestore();
        const dbref = doc(db, "Product", item["Id"]);
        const docRef = await updateDoc(dbref, {
          Name: productName,
          Discription: discription,
          Price: price,
          Category: selectedCat,
        });

        if (inputimg) {
          const storage = getStorage();
          const desertRef = storageRef(storage, item["Img"]);
          await deleteObject(desertRef);

          const productStorageRef = storageRef(
            storage,
            `/product/${selectedCat}/${item["Id"]}/${inputimg.name}`
          );

          const snapshot = await uploadBytes(productStorageRef, inputimg);

          const downloadURL = await getDownloadURL(snapshot.ref);

          await updateDoc(doc(db, "Product", item["Id"]), {
            Img: downloadURL,
          });
        }

        setOpen(false);
        setinputError(false);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      setinputError(true);
    }
  };

  return (
    <div className="w-72 shadow-2xl m-4">
      <LazyLoad height={200}>
        <img
          className="object-contain border-4 w-64 m-auto"
          src={item["Img"]}
        />
      </LazyLoad>

      <h1 className="text-center font-semibold text-lg">{item["Name"]}</h1>
      <h2 className="text-center font-bold text-red-600">
        {"RS: " + item["Price"]}
      </h2>
      <p className="text-center">{item["Discription"]}</p>
      <div className="flex justify-between">
        <button
          onClick={handleClickOpen}
          className="p-4 grow bg-green-600 font-semibold text-white"
        >
          Edit
        </button>
        <button
          onClick={handleRemove}
          className="p-4 grow bg-red-600 font-semibold text-white"
        >
          Remove
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <div className="m-2">
            <TextField
              onChange={(e) => setProductName(e.target.value)}
              className="w-full"
              id="outlined-basic"
              label="Product Name"
              type="text"
              variant="outlined"
              value={productName}
            />

            <textarea
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Description"
              className="w-full border p-3 border-gray-400 rounded-md my-2 h-24"
            ></textarea>
            <TextField
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
              id="outlined-basic"
              label="Price"
              type="number"
              variant="outlined"
              value={price}
            />
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
                  console.log("ok.");
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

            <Box sx={{ minWidth: 120, paddingTop: "1rem" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCat}
                  label="Category"
                  onChange={handleChange}
                >
                  {catList.length > 0 ? (
                    catList.map((e, i) => (
                      <MenuItem key={"addp" + i} value={e}>
                        {e}
                      </MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={editProduct} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
