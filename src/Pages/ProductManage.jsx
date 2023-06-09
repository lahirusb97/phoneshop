import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageCategory from "../Components/ManageCategory";
import Product from "../Components/Product";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
export default function ProductManage() {
  const [CategoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(
      doc(db, "/Category/FMjKPsKH4uZQqnwqbPHf/"),
      (doc) => {
        if (doc.exists()) {
          setCategoryList(doc.data()["Category_list"]);
        } else {
          setCategoryList([]);
        }
      }
    );
  }, []);

  return (
    <div>
      <ManageCategory catList={CategoryList} />
      <Product />
    </div>
  );
}
