import { Grid, Typography } from "@mui/material";

import Item from "../models/Item";
import ItemBetsBetForm from "./ItemBetsBetForm";
import ItemBetsBettorList from "./ItemBetsBettorList";

type ItemBetsProps = {
  item: Item;
};

export default function ItemBets({ item }: ItemBetsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ItemBetsBetForm itemId={item.id} itemPrice={item.price} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">People in the queue</Typography>
        <ItemBetsBettorList itemId={item.id} />
      </Grid>
    </Grid>
  );
}
