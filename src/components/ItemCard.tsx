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
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card>
      <Carousel showThumbs={false} showStatus={false}>
        {item.imageUrls.map((imageUrl, index) => (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            key={index}
          />
        ))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button to={`/item/${item.id}`} component={RouterLink}>
          I want it!
        </Button>
      </CardActions>
    </Card>
  );
}
