import { Grid } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useState } from "react";
import ItemCard from "../components/ItemCard";
import { itemsColRef } from "../helpers/firebase";
import Item from "../models/Item";

export default function SaleList() {
  const [items, setItems] = useState<Item[]>([]);

  getDocs(itemsColRef).then((snapshot) => {
    let dbItems: Item[] = [];
    snapshot.docs.forEach((doc) => {
      let data = doc.data();
      dbItems.push({
        id: doc.id,
        imageUrls: data.imageUrls,
        name: data.name,
        description: data.description,
      });
    });
    setItems(dbItems);
  });

  return (
    <Grid container spacing={4} rowSpacing={4}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
