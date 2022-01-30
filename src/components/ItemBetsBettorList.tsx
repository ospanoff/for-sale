import {
  collection,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import db from "../helpers/firebase";
import Bettor, { bettorConverter } from "../models/Bettor";

type ItemBetsBettorListProps = {
  itemId: string;
};

const bettorsColRef = collection(db, "bettors").withConverter(bettorConverter);

export default function ItemBetsBettorList({
  itemId,
}: ItemBetsBettorListProps) {
  const [bettors, setBettors] = useState<Bettor[]>([]);

  useEffect(() => {
    const itemDocRef = doc(db, "items", itemId);
    const bettorsQuery = query(
      bettorsColRef,
      where("item", "==", itemDocRef),
      orderBy("amount", "desc"),
      orderBy("createdAt")
    );
    onSnapshot(bettorsQuery, (querySnapshot) => {
      let dbBettors: Bettor[] = [];
      querySnapshot.forEach((doc) => {
        dbBettors.push(doc.data());
      });
      setBettors(dbBettors);
    });
  }, [itemId]);

  if (bettors.length === 0) {
    return <Typography>Be the first!</Typography>;
  }

  return (
    <List>
      {bettors.map((bettor) => (
        <ListItem key={bettor.id}>
          <ListItemAvatar>
            <Avatar>
              <Icon>face</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={bettor.email}
            secondary={`${bettor.amount} SEK`}
          />
        </ListItem>
      ))}
    </List>
  );
}
