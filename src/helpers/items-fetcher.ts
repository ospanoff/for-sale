import Item from "../models/Item";

function fetch(): Item[] {
  const items = [];
  for (let i = 0; i < 6; i++) {
    items.push({
      id: i.toString(),
      imageUrls: [
        "https://picsum.photos/1600/900",
        "https://picsum.photos/800/450",
      ],
      name: "",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000" +
        " species, ranging across all continents except Antarctica",
    });
  }
  return items;
}

export default fetch;
