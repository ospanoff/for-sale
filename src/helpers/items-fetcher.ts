import Item from "../models/Item";

function fetch(): Item[] {
  const items = [];
  for (let i = 0; i < 6; i++) {
    items.push({
      id: "1",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
      name: "",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000" +
        " species, ranging across all continents except Antarctica",
    });
  }
  return items;
}

export default fetch;
