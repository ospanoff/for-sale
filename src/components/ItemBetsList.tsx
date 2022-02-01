import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import useAuth from "../helpers/auth";
import db from "../helpers/firebase";
import Bet, { betConverter } from "../models/Bet";

type ItemBetsListProps = {
  itemId: string;
  setUserHasBet: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemBetsList({
  itemId,
  setUserHasBet,
}: ItemBetsListProps) {
  const [bets, setBets] = useState<Bet[]>([]);
  const { userEmail } = useAuth();

  useEffect(() => {
    const betsColRef = collection(db, "items", itemId, "bets").withConverter(
      betConverter
    );
    const betsQuery = query(
      betsColRef,
      orderBy("amount", "desc"),
      orderBy("createdAt")
    );
    onSnapshot(betsQuery, (querySnapshot) => {
      let dbBets: Bet[] = [];
      let userHasBet = false;
      querySnapshot.forEach((doc) => {
        const bet = doc.data();
        dbBets.push(bet);
        if (bet.email === userEmail) {
          userHasBet = true;
        }
      });
      setBets(dbBets);
      setUserHasBet(userHasBet);
    });
  }, [itemId, userEmail, setUserHasBet]);

  const removeBet = async (bettorEmail: string) => {
    const betDocRef = doc(db, "items", itemId, "bets", bettorEmail);
    await deleteDoc(betDocRef);
    setUserHasBet(false);
  };

  if (bets.length === 0) {
    return <Typography>Be the first!</Typography>;
  }

  return (
    <List>
      {bets.map((bet) => (
        <ListItem
          key={bet.email}
          secondaryAction={
            bet.email === userEmail && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeBet(bet.email)}
              >
                <Icon>person_remove</Icon>
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <Icon>face</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={bet.email} secondary={`${bet.amount} SEK`} />
        </ListItem>
      ))}
    </List>
  );
}
