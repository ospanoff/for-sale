import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import db from "../helpers/firebase";

type ItemBetsBetFormProps = {
  itemId: string;
  itemPrice: number;
  userHasBet: boolean;
  setUserHasBet: React.Dispatch<React.SetStateAction<boolean>>;
};

const betsColRef = collection(db, "bets");

export default function ItemBetsBetForm({
  itemId,
  itemPrice,
  userHasBet,
  setUserHasBet,
}: ItemBetsBetFormProps) {
  const [betAmount, setBetAmount] = useState(itemPrice);

  const itemDocRef = doc(db, "items", itemId);

  const bet = async () => {
    setUserHasBet(true);
    await addDoc(betsColRef, {
      createdAt: serverTimestamp(),
      email: "test@asd.com",
      amount: betAmount,
      item: itemDocRef,
    });
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
          <Tooltip title={userHasBet ? "You have already placed a bet" : ""}>
            <span>
              <Button color="secondary" onClick={bet} disabled={userHasBet}>
                <Icon>person_add</Icon> Queue up
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
