import { useEffect, useState } from "react";

import {
  Avatar,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import Bettor from "../models/Bettor";

type ItemBetsBettorListProps = {
  itemId: string;
};

export default function ItemBetsBettorList({
  itemId,
}: ItemBetsBettorListProps) {
  const [bettors, setBettors] = useState<Bettor[]>([]);

  useEffect(() => {
    setBettors(
      Array(15)
        .fill(0)
        .map((_, index) => {
          return new Bettor("randomId" + index, "email@gmail.com", 121);
        })
    );
  }, []);

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
