import { Carousel } from "react-responsive-carousel";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Item from "../models/Item";

type ItemCardProps = {
  item: Item;
  showActions?: boolean;
};

export default function ItemCard({ item, showActions }: ItemCardProps) {
  if (showActions === undefined) {
    showActions = true;
  } else {
    showActions = false;
  }
  return (
    <Card variant="outlined">
      <Carousel showThumbs={false} showStatus={false}>
        {item.imageUrls.map((imageUrl, index) => (
          <CardMedia component="img" image={imageUrl} key={index} />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: {item.price > 0 ? `${item.price} SEK` : "free"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button
            to={`/item/${item.id}`}
            component={RouterLink}
            variant="contained"
            disableElevation
          >
            I want it!
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
