import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import ItemBets from "../components/ItemBets";
import ItemCard from "../components/ItemCard";
import db from "../helpers/firebase";
import Item, { itemConverter } from "../models/Item";

export default function ItemPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const docRef = doc(db, "items", itemId || "").withConverter(itemConverter);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setItem(doc.data());
      }
    });
  }, [itemId]);

  if (item === undefined) {
    return <div></div>;
  }
  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ItemCard item={item} showActions={false}></ItemCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ItemBets item={item} />
        </Grid>
      </Grid>
    </Box>
  );
}
