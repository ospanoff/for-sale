import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
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

const betsColRef = collection(db, "bets").withConverter(betConverter);

export default function ItemBetsList({
  itemId,
  setUserHasBet,
}: ItemBetsListProps) {
  const [bets, setBets] = useState<Bet[]>([]);
  const { userEmail } = useAuth();

  useEffect(() => {
    const itemDocRef = doc(db, "items", itemId);
    const betsQuery = query(
      betsColRef,
      where("item", "==", itemDocRef),
      orderBy("amount", "desc"),
      orderBy("createdAt")
    );
    onSnapshot(betsQuery, (querySnapshot) => {
      let dbBets: Bet[] = [];
      querySnapshot.forEach((doc) => {
        dbBets.push(doc.data());
      });
      setBets(dbBets);
    });
  }, [itemId]);

  const removeBet = async (betId: string) => {
    const betDocRef = doc(db, "bets", betId);
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
          key={bet.id}
          secondaryAction={
            bet.email === userEmail && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeBet(bet.id)}
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
