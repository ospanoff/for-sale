import { Grid } from "@mui/material";
import ItemCard from "../components/ItemCard";
import Item from "../models/Item";

type SaleListProps = {
  items: Item[];
};

export default function SaleList({ items }: SaleListProps) {
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
