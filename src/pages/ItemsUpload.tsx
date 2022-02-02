import { collection, doc, writeBatch } from "firebase/firestore";
import Papa from "papaparse";

import { Box, Button } from "@mui/material";

import db from "../helpers/firebase";

const batch = writeBatch(db);
const itemsColRef = collection(db, "items");

export default function ItemsUpload() {
  const parseFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: ({ data }: Papa.ParseResult<any>) => {
        data.forEach((row) => {
          const itemDocRef = doc(itemsColRef);
          batch.set(itemDocRef, {
            imageUrls: row["imageUrls"].split(","),
            name: row["name"],
            description: row["description"],
            price: parseInt(row["price"]),
            soldTo: null,
          });
        });
        batch.commit();
      },
    });
  };

  const onFileSelect = (event: any) => {
    if (event.target?.files?.length) {
      const file: File = event.target.files[0];
      parseFile(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <Button variant="contained" component="label" onChange={onFileSelect}>
        Upload items
        <input type="file" accept="text/csv" hidden />
      </Button>
    </Box>
  );
}
