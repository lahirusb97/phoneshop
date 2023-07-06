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
  onSnapshot,
} from "firebase/firestore";
import ItemCard from "./ItemCard";
export default function ProductList({ catList }) {
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    if (catList.length > 0) {
      const db = getFirestore();
      const citiesRef = collection(db, "Product");
      const q = query(citiesRef, where("Category", "==", catList[value]));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setItems(items);
      });

      // Cleanup the listener when the value changes
      return () => unsubscribe();
    }
  }, [value, open]);

  return (
    <div className="p-4">
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
      <div className="flex flex-wrap justify-center">
        {items.map((e, i) => (
          <div key={"items" + i}>
            <ItemCard catList={catList} item={e} val={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
