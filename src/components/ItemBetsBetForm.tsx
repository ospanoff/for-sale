import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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

import useAuth from "../helpers/auth";
import db from "../helpers/firebase";

type ItemBetsBetFormProps = {
  itemId: string;
  itemPrice: number;
  userHasBet: boolean;
  setUserHasBet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemBetsBetForm({
  itemId,
  itemPrice,
  userHasBet,
  setUserHasBet,
}: ItemBetsBetFormProps) {
  const [betAmount, setBetAmount] = useState(itemPrice);
  const { userEmail } = useAuth();

  const betDocRef = doc(db, "items", itemId, "bets", userEmail!);

  const bet = async () => {
    setUserHasBet(true);
    await setDoc(betDocRef, {
      createdAt: serverTimestamp(),
      amount: betAmount,
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
