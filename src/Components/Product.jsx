import React, { useState } from "react";
import { TextField, TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getFirestore, collection, addDoc } from "firebase/firestore";
//
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//
export default function Product({ catList }) {
  const [open, setOpen] = useState(false);
  const [inputimg, setInputImg] = useState(null);
  const [productName, setProductName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [inputError, setinputError] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const addProduct = async () => {
    if (
      productName.length > 0 &&
      discription.length > 0 &&
      price.length > 0 &&
      selectedCat.length > 0 &&
      inputimg
    ) {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "Product"), {
        Name: productName,
        Discription: discription,
        Price: price,
        Category: selectedCat,
      });
      console.log("Document written with ID: ", docRef.id);
      setinputError(false);
    } else {
      setinputError(true);
    }
  };

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
