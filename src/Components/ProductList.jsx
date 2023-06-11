import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import ItemCard from "./ItemCard";
export default function ProductList({ catList }) {
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (catList.length > 0) {
      const db = getFirestore();
      const citiesRef = collection(db, "Product");
      const q = query(citiesRef, where("Category", "==", catList[value]));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          console.log(doc);
        });
        setItems(items);
      });

      // Cleanup the listener when the value changes
      return () => unsubscribe();
    }
  }, [value]);

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category List</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => setValue(e.target.value)}
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {catList.map((e, i) => (
            <FormControlLabel
              key={"e" + i}
              value={i}
              control={<Radio />}
              label={e}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div>
        {items.map((e, i) => (
          <div key={"items" + i}>
            <ItemCard item={e} />
          </div>
        ))}
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
          <Button onClick={addProduct} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
