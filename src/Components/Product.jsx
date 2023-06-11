import React, { useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
//
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//
export default function Product({ catList }) {
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

  //  addProduct
  const addProduct = async () => {
    if (
      productName.length > 0 &&
      discription.length > 0 &&
      price.length > 0 &&
      selectedCat.length > 0 &&
      inputimg
    ) {
      try {
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "Product"), {
          Name: productName,
          Discription: discription,
          Price: price,
          Category: selectedCat,
        });

        const storage = getStorage();
        const productStorageRef = storageRef(
          storage,
          `/product/${docRef.id}/${inputimg.name}`
        );

        const snapshot = await uploadBytes(productStorageRef, inputimg);

        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, "Product", docRef.id), {
          Img: downloadURL,
          Id: docRef.id,
        });

        setOpen(false);
        setinputError(false);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      setinputError(true);
    }
  };
  //--------------------------------------
  return (
    <div>
      <div className="border-2 border-black m-2 p-2">
        <h1 className="font-bold text-2xl text-blue-800">Manage Product</h1>
        <button
          onClick={handleClickOpen}
          className="p-4 bg-green-600 text-white font-semibold text-lg my-2"
        >
          Add Product
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
            />

            <textarea
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
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCat}
                  label="Age"
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
          <Button onClick={addProduct} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
