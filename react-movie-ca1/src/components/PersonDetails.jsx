import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { excerpt } from "../util";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const PersonDetails = ({ personDetails }) => {
  // Don't miss this!
  const [bioLong, setBioLong] = useState(false);

  return (
    <Stack>
      <Typography variant="h5">Overview</Typography>

      {bioLong ? (
        <Typography
          variant="h6"
          component="p"
          sx={{ marginTop: "10px", marginBottom: "25px" }}
        >
          {personDetails.biography}
          <Button size="small" onClick={() => setBioLong(false)}>
            Read Less
          </Button>
        </Typography>
      ) : (
        <Typography
          variant="h6"
          component="p"
          sx={{ marginTop: "10px", marginBottom: "25px" }}
        >
          {excerpt(personDetails.biography)}
          <Button size="small" onClick={() => setBioLong(true)}>
            Read More
          </Button>
        </Typography>
      )}
    </Stack>
  );
};
export default PersonDetails;
