import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
export default function ProductList({ catList }) {
  const [value, setValue] = useState("");
  const [items, setItems] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const newObject = Object.create(null);
    catList.forEach((e) => {
      newObject[e] = {};
    });
    setItems(newObject);
  }, []);

  useEffect(() => {
    const db = getFirestore();
    const citiesRef = collection(db, "Product");
    // Create a query against the collection.
    const q = query(citiesRef, where("Category", "==", catList[value]));
    const getItems = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    };
    getItems();
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
    </div>
  );
}
