import { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

type ItemBetsBetFormProps = {
  itemId: string;
  itemPrice: number;
};

export default function ItemBetsBetForm({
  itemId,
  itemPrice,
}: ItemBetsBetFormProps) {
  const [betAmount, setBetAmount] = useState(itemPrice);
  const bet = () => {
    alert(`You bet ${betAmount} for item ${itemId}`);
  };

  return (
    <Box component="form">
      <Grid container spacing={1}>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Typography>I give</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="amount"
            type="number"
            value={betAmount}
            onChange={(event) => setBetAmount(parseInt(event.target.value))}
            autoComplete="off"
            size="small"
            style={{ width: "130px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">SEK</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <Button color="secondary" onClick={bet}>
            <Icon>person_add</Icon> Queue up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
