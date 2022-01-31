import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import db from "../helpers/firebase";
import Item from "../models/Item";
import ItemBetsBetForm from "./ItemBetsBetForm";
import ItemBetsList from "./ItemBetsList";

type ItemBetsProps = {
  item: Item;
};

const betsColRef = collection(db, "bets");

export default function ItemBets({ item }: ItemBetsProps) {
  const [userHasBet, setUserHasBet] = useState(false);

  const itemDocRef = doc(db, "items", item.id);

  useEffect(() => {
    const betsQuery = query(
      betsColRef,
      where("item", "==", itemDocRef),
      where("email", "==", "test@asd.com")
    );
    getDocs(betsQuery).then((querySnapshot) => {
      setUserHasBet(!querySnapshot.empty);
    });
  }, [itemDocRef]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ItemBetsBetForm
          itemId={item.id}
          itemPrice={item.price}
          userHasBet={userHasBet}
          setUserHasBet={setUserHasBet}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">People in the queue</Typography>
        <ItemBetsList itemId={item.id} setUserHasBet={setUserHasBet} />
      </Grid>
    </Grid>
  );
}
